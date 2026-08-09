export class CommandExecutor {
  constructor({
    sceneManager,
    conditionManager,
    characterManager,
    backgroundManager,
    effectManager,
    audioManager,
    sceneCgManager,
    debugManager
  }) {
    this.sceneManager = sceneManager;
    this.conditionManager = conditionManager;
    this.characterManager = characterManager;
    this.backgroundManager = backgroundManager;
    this.effectManager = effectManager;
    this.audioManager = audioManager;
    this.sceneCgManager = sceneCgManager;
    this.debugManager = debugManager;
  }

  async execute(scene) {
    if (!scene) return { skipped: true };

    if (scene.if && !this.conditionManager.evaluate(scene.if)) {
      if (scene.elseJump) {
        this.sceneManager.jump(scene.elseJump);
        return { jumped: true };
      }
      return { skipped: true };
    }

    if (scene.set) this.sceneManager.applySet(scene.set);
    if (scene.flag?.name) {
      this.sceneManager.applyFlag(scene.flag.name, scene.flag.value ?? true);
    }

    if (scene.background) {
      this.backgroundManager.change(scene.background, scene.transition || "fade");
    }

    // v0.9.8.6: scene.id를 CG 매니페스트에서 자동 조회한다.
    // CG가 있는 정확한 장면에서만 표시하며, 다음 일반 장면에서 즉시 해제한다.
    const hasSceneCg = Boolean(this.sceneCgManager?.resolve(scene));
    if (hasSceneCg) {
      this.characterManager.hideAll();
      await this.sceneCgManager.updateScene(scene);
    } else {
      this.sceneCgManager?.hide();
    }

    // v0.9.8.4: 캐릭터는 해당 캐릭터가 직접 말할 때만 표시한다.
    const speakerName = String(scene.speaker || "").trim();
    const speakerId = String(scene.speakerId || "").trim();
    const isSpeakingCharacter = (command) => {
      if (!command || !speakerName) return false;
      const character = this.characterManager.manifest?.[command.id];
      if (!character) return false;
      return speakerId === command.id || speakerName === character.name || speakerName === command.id;
    };

    if (hasSceneCg) {
      // 이벤트 CG는 스탠딩보다 우선한다.
      this.characterManager.hideAll();
    } else if (scene.characters) {
      const speakingCharacters = scene.characters.filter(isSpeakingCharacter);
      if (speakingCharacters.length > 0) {
        this.characterManager.showMany(
          speakingCharacters.map((command) => ({ ...command, speaking: true }))
        );
      } else {
        this.characterManager.hideAll();
      }
    } else if (scene.character && isSpeakingCharacter(scene.character)) {
      this.characterManager.hideAll();
      this.characterManager.show({ ...scene.character, speaking: true });
    } else {
      this.characterManager.hideAll();
    }

    if (scene.hideCharacters) {
      for (const item of scene.hideCharacters) {
        if (typeof item === "string") {
          this.characterManager.hide(item);
        } else {
          await this.characterManager.hideAnimated(
            item.position,
            item.animation || "fade",
            item.duration || 280
          );
        }
      }
    }

    if (scene.battle && !hasSceneCg) {
      const battleCharacter = this.characterManager.manifest?.[scene.battle.characterId];
      const battleSpeakerMatches = Boolean(speakerName && battleCharacter && (speakerId === scene.battle.characterId || speakerName === battleCharacter.name || speakerName === scene.battle.characterId));
      if (battleSpeakerMatches) {
        this.characterManager.hideAll();
        this.characterManager.showBattle(scene.battle.characterId, scene.battle.action, scene.battle.position || "center");
      } else {
        this.characterManager.hideAll();
      }
    }

    if (scene.ambient) {
      await this.audioManager.crossfadeAmbient(scene.ambient, scene.fadeMs || 700);
    }

    if (scene.bgm) {
      await this.audioManager.crossfadeBgm(scene.bgm, scene.fadeMs || 900);
    }

    if (scene.stopBgm) this.audioManager.stopBgm(scene.fadeMs || 500);
    if (scene.stopAmbient) this.audioManager.stopAmbient(scene.fadeMs || 500);
    if (scene.sfx) await this.audioManager.playSfx(scene.sfx);

    if (scene.effect) {
      this.effectManager.play(scene.effect, scene.effectDuration || 700);
    }

    if (scene.wait) {
      await new Promise((resolve) => setTimeout(resolve, Number(scene.wait)));
    }

    if (scene.jump) {
      this.sceneManager.jump(scene.jump);
      return { jumped: true };
    }

    this.debugManager?.log(`명령 실행: ${scene.id}`);
    return { skipped: false };
  }
}
