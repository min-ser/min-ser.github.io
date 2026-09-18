# NeuralScope Curriculum — v0.0.8

> **29 Chapters · 467 Topics**

> 목표: AI 입문자가 기초 수학과 데이터부터 ML/DL, Transformer/LLM, RAG/Agent, 시스템 엔지니어링, MLOps/보안, 직접 구현까지 한 경로에서 학습할 수 있는 전체 지식 지도를 유지한다.

## Level

- **CORE** — 해당 경로에서 반드시 이해할 핵심 개념
- **RECOMMENDED** — 핵심을 더 단단하게 만드는 권장 개념
- **REFERENCE** — 필요할 때 찾아보는 배경/전통 기법
- **ADVANCED** — 기초 완료 후 확장하는 고급 주제

## 00. AI FOUNDATION — AI 기초 지도

AI, ML, DL, 생성형 AI와 LLM의 관계를 잡고 전체 학습 지도를 만듭니다.

- `00.01` What is AI? — AI란 무엇인가? [CORE]
- `00.02` History of AI — AI의 역사와 발전 [REFERENCE]
- `00.03` Rule-based vs Learning — 규칙 기반과 학습 기반 [CORE]
- `00.04` AI vs ML vs DL — AI·ML·DL 관계 [CORE]
- `00.05` Generative AI & Foundation Models — 생성형 AI와 파운데이션 모델 [CORE]
- `00.06` LLM & AI Agent Overview — LLM과 AI Agent 개요 [CORE]
- `00.07` AI Problem Types — AI가 푸는 문제 유형 [CORE]
- `00.08` Training vs Inference — 학습과 추론 [CORE]
- `00.09` Model / Data / Compute — 모델·데이터·컴퓨팅 [CORE]
- `00.10` AI Field Map — AI 전체 분야 지도 [CORE]

## 01. MATHEMATICS FOR AI — AI 수학

AI 계산을 읽는 데 필요한 선형대수, 미적분, 확률·통계, 정보이론을 직관부터 연결합니다.

- `01.01` Number, Scalar & Tensor — 수·스칼라·텐서 [CORE]
- `01.02` Vector — 벡터 [CORE]
- `01.03` Matrix — 행렬 [CORE]
- `01.04` Tensor Shape & Dimension — 텐서 Shape과 차원 [CORE]
- `01.05` Vector Operations — 벡터 연산 [CORE]
- `01.06` Dot Product — 내적 [CORE]
- `01.07` Matrix Multiplication — 행렬 곱 [CORE]
- `01.08` Transpose & Identity Matrix — 전치·단위행렬 [RECOMMENDED]
- `01.09` Norm & Distance — 노름과 거리 [CORE]
- `01.10` Linear Transformation — 선형 변환 [RECOMMENDED]
- `01.11` Eigenvalue & Eigenvector — 고유값과 고유벡터 [ADVANCED]
- `01.12` Function — 함수 [CORE]
- `01.13` Derivative — 미분 [CORE]
- `01.14` Partial Derivative — 편미분 [CORE]
- `01.15` Chain Rule — 연쇄 법칙 [CORE]
- `01.16` Gradient — 기울기 [CORE]
- `01.17` Probability Basics — 확률 기초 [CORE]
- `01.18` Conditional Probability & Bayes — 조건부확률과 베이즈 [RECOMMENDED]
- `01.19` Random Variable & Distribution — 확률변수와 분포 [RECOMMENDED]
- `01.20` Mean, Variance & Standard Deviation — 평균·분산·표준편차 [CORE]
- `01.21` Logarithm & Exponential — 로그와 지수 [CORE]
- `01.22` Entropy & Cross Entropy — 엔트로피와 교차 엔트로피 [CORE]
- `01.23` KL Divergence — KL Divergence [ADVANCED]
- `01.24` Softmax Mathematics — Softmax 수학 [CORE]

## 02. DATA & PREPROCESSING — 데이터와 전처리

모델보다 먼저 데이터가 어떻게 구성·변환·분리되는지 학습합니다.

- `02.01` Dataset — 데이터셋 [CORE]
- `02.02` Sample / Feature / Label — 샘플·특징·정답 [CORE]
- `02.03` Structured vs Unstructured Data — 정형·비정형 데이터 [CORE]
- `02.04` Data Collection — 데이터 수집 [RECOMMENDED]
- `02.05` Data Quality — 데이터 품질 [CORE]
- `02.06` Missing Values — 결측치 [RECOMMENDED]
- `02.07` Outliers — 이상치 [RECOMMENDED]
- `02.08` Categorical Encoding — 범주형 인코딩 [CORE]
- `02.09` Scaling & Standardization — 스케일링과 표준화 [CORE]
- `02.10` Normalization — 정규화 [CORE]
- `02.11` Feature Engineering — 특징 공학 [RECOMMENDED]
- `02.12` Feature Selection — 특징 선택 [RECOMMENDED]
- `02.13` Train / Validation / Test — 학습·검증·테스트 분리 [CORE]
- `02.14` Data Leakage — 데이터 누수 [CORE]
- `02.15` Class Imbalance — 클래스 불균형 [RECOMMENDED]
- `02.16` Data Augmentation — 데이터 증강 [RECOMMENDED]
- `02.17` Data Pipeline — 데이터 파이프라인 [CORE]

## 03. MACHINE LEARNING FUNDAMENTALS — 머신러닝 기초

데이터에서 패턴을 학습한다는 의미와 대표 학습 패러다임을 이해합니다.

- `03.01` What is Machine Learning? — 머신러닝이란? [CORE]
- `03.02` Learning from Data — 데이터에서 학습한다는 것 [CORE]
- `03.03` Training & Inference — 학습과 추론 [CORE]
- `03.04` Supervised Learning — 지도학습 [CORE]
- `03.05` Regression — 회귀 [CORE]
- `03.06` Classification — 분류 [CORE]
- `03.07` Unsupervised Learning — 비지도학습 [CORE]
- `03.08` Clustering — 군집화 [CORE]
- `03.09` Dimensionality Reduction — 차원 축소 [RECOMMENDED]
- `03.10` Semi-supervised Learning — 준지도학습 [REFERENCE]
- `03.11` Self-supervised Learning — 자기지도학습 [CORE]
- `03.12` Reinforcement Learning — 강화학습 [RECOMMENDED]
- `03.13` Generalization — 일반화 [CORE]
- `03.14` Overfitting & Underfitting — 과적합과 과소적합 [CORE]
- `03.15` Bias & Variance — 편향과 분산 [CORE]
- `03.16` Parameters vs Hyperparameters — 파라미터와 하이퍼파라미터 [CORE]

## 04. CLASSICAL MACHINE LEARNING — 전통 머신러닝

딥러닝 이전부터 널리 쓰이는 주요 알고리즘의 가정과 사용처를 비교합니다.

- `04.01` Linear Regression — 선형 회귀 [CORE]
- `04.02` Polynomial Regression — 다항 회귀 [REFERENCE]
- `04.03` Logistic Regression — 로지스틱 회귀 [CORE]
- `04.04` k-Nearest Neighbors — k-NN [RECOMMENDED]
- `04.05` Naive Bayes — 나이브 베이즈 [REFERENCE]
- `04.06` Decision Tree — 결정 트리 [CORE]
- `04.07` Random Forest — 랜덤 포레스트 [CORE]
- `04.08` Gradient Boosting — 그래디언트 부스팅 [RECOMMENDED]
- `04.09` XGBoost / LightGBM Concepts — XGBoost·LightGBM 개념 [REFERENCE]
- `04.10` Support Vector Machine — SVM [RECOMMENDED]
- `04.11` k-Means — k-Means [CORE]
- `04.12` Hierarchical Clustering — 계층적 군집화 [REFERENCE]
- `04.13` DBSCAN — DBSCAN [REFERENCE]
- `04.14` PCA — 주성분 분석 [RECOMMENDED]
- `04.15` Ensemble Learning — 앙상블 학습 [CORE]

## 05. ML TRAINING & EVALUATION — ML 학습과 평가

좋은 모델을 고르고 검증하기 위한 손실, 지표, 검증, 튜닝 방법을 학습합니다.

- `05.01` Loss vs Metric — 손실과 평가 지표 [CORE]
- `05.02` MAE / MSE / RMSE — 회귀 평가 지표 [CORE]
- `05.03` Accuracy — 정확도 [CORE]
- `05.04` Confusion Matrix — 혼동 행렬 [CORE]
- `05.05` Precision / Recall / F1 — 정밀도·재현율·F1 [CORE]
- `05.06` ROC & AUC — ROC와 AUC [RECOMMENDED]
- `05.07` Threshold — 분류 임계값 [CORE]
- `05.08` Cross Validation — 교차 검증 [CORE]
- `05.09` Baseline Model — 베이스라인 모델 [CORE]
- `05.10` Hyperparameter Tuning — 하이퍼파라미터 튜닝 [CORE]
- `05.11` Grid / Random Search — Grid·Random Search [REFERENCE]
- `05.12` Regularization — 규제 [CORE]
- `05.13` L1 & L2 — L1·L2 규제 [RECOMMENDED]
- `05.14` Learning Curve — 학습 곡선 [RECOMMENDED]
- `05.15` Error Analysis — 오류 분석 [CORE]

## 06. DEEP LEARNING FOUNDATION — 딥러닝 기초

뉴런에서 네트워크까지 딥러닝의 계산 구조를 단계적으로 이해합니다.

- `06.01` What is Deep Learning? — 딥러닝이란? [CORE]
- `06.02` ML vs Deep Learning — ML과 DL 비교 [CORE]
- `06.03` Representation Learning — 표현 학습 [CORE]
- `06.04` Perceptron — 퍼셉트론 [CORE]
- `06.05` Neuron — 뉴런 [CORE]
- `06.06` Input / Weight / Bias — 입력·가중치·편향 [CORE]
- `06.07` Weighted Sum — 가중합 [CORE]
- `06.08` Activation Function — 활성화 함수 [CORE]
- `06.09` Sigmoid / Tanh / ReLU — 대표 활성화 함수 [CORE]
- `06.10` Layer — 레이어 [CORE]
- `06.11` Hidden Layer — 은닉층 [CORE]
- `06.12` Neural Network — 신경망 [CORE]
- `06.13` Forward Propagation — 순전파 [CORE]
- `06.14` Output Layer — 출력층 [CORE]
- `06.15` Universal Approximation Intuition — 범용 근사 직관 [ADVANCED]

## 07. NEURAL NETWORK TRAINING — 신경망 학습

오차가 어떻게 역전파되고 파라미터가 업데이트되는지 학습 루프 전체를 연결합니다.

- `07.01` Loss Function — 손실 함수 [CORE]
- `07.02` Gradient Descent — 경사하강법 [CORE]
- `07.03` Chain Rule in Networks — 신경망의 연쇄 법칙 [CORE]
- `07.04` Backpropagation — 역전파 [CORE]
- `07.05` Computational Graph — 계산 그래프 [CORE]
- `07.06` SGD — 확률적 경사하강법 [CORE]
- `07.07` Momentum — 모멘텀 [RECOMMENDED]
- `07.08` Adam — Adam [CORE]
- `07.09` Learning Rate — 학습률 [CORE]
- `07.10` Epoch / Batch / Iteration — 에폭·배치·이터레이션 [CORE]
- `07.11` Mini-batch Training — 미니배치 학습 [CORE]
- `07.12` Weight Initialization — 가중치 초기화 [RECOMMENDED]
- `07.13` Vanishing Gradient — 기울기 소실 [CORE]
- `07.14` Exploding Gradient — 기울기 폭주 [RECOMMENDED]
- `07.15` Batch Normalization — 배치 정규화 [RECOMMENDED]
- `07.16` Layer Normalization — 레이어 정규화 [CORE]
- `07.17` Dropout — 드롭아웃 [RECOMMENDED]
- `07.18` Early Stopping — 조기 종료 [RECOMMENDED]
- `07.19` Training Loop — 전체 학습 루프 [CORE]

## 08. DEEP LEARNING ARCHITECTURES — 딥러닝 아키텍처

문제 특성에 따라 신경망 구조가 어떻게 발전했는지 연결합니다.

- `08.01` MLP — 다층 퍼셉트론 [CORE]
- `08.02` CNN Overview — CNN 개요 [CORE]
- `08.03` Convolution — 합성곱 [CORE]
- `08.04` Pooling — 풀링 [RECOMMENDED]
- `08.05` RNN — RNN [CORE]
- `08.06` Hidden State — 은닉 상태 [CORE]
- `08.07` LSTM — LSTM [RECOMMENDED]
- `08.08` GRU — GRU [REFERENCE]
- `08.09` Encoder / Decoder — 인코더·디코더 [CORE]
- `08.10` Seq2Seq — Seq2Seq [CORE]
- `08.11` Attention Transition — Attention으로의 전환 [CORE]
- `08.12` Autoencoder — 오토인코더 [RECOMMENDED]
- `08.13` Variational Autoencoder — VAE [ADVANCED]
- `08.14` GAN — GAN [RECOMMENDED]
- `08.15` Transformer Transition — Transformer로의 전환 [CORE]

## 09. COMPUTER VISION — 컴퓨터 비전

이미지가 텐서에서 특징으로 변환되고 분류·탐지·분할되는 흐름을 이해합니다.

- `09.01` Image as Tensor — 이미지를 텐서로 표현 [CORE]
- `09.02` Channels & Pixels — 채널과 픽셀 [CORE]
- `09.03` Convolution Kernel — 합성곱 커널 [CORE]
- `09.04` Feature Map — 특징 맵 [CORE]
- `09.05` Stride & Padding — Stride와 Padding [RECOMMENDED]
- `09.06` Pooling — 풀링 [RECOMMENDED]
- `09.07` Image Classification — 이미지 분류 [CORE]
- `09.08` Transfer Learning — 전이 학습 [CORE]
- `09.09` Object Detection — 객체 탐지 [RECOMMENDED]
- `09.10` Bounding Box & IoU — Bounding Box와 IoU [RECOMMENDED]
- `09.11` Image Segmentation — 이미지 분할 [RECOMMENDED]
- `09.12` Data Augmentation for Vision — 비전 데이터 증강 [RECOMMENDED]
- `09.13` Vision Transformer — Vision Transformer [RECOMMENDED]
- `09.14` Image Embedding — 이미지 임베딩 [CORE]

## 10. NLP FOUNDATION — 자연어 처리 기초

텍스트가 모델이 계산할 수 있는 토큰과 벡터로 변환되는 과정을 학습합니다.

- `10.01` What is NLP? — 자연어 처리란? [CORE]
- `10.02` Corpus & Document — 코퍼스와 문서 [CORE]
- `10.03` Text Preprocessing — 텍스트 전처리 [RECOMMENDED]
- `10.04` Tokenization — 토큰화 [CORE]
- `10.05` Word / Subword / Character — 단어·서브워드·문자 토큰 [CORE]
- `10.06` Vocabulary — 어휘집 [CORE]
- `10.07` Token ID — 토큰 ID [CORE]
- `10.08` One-hot Encoding — 원-핫 인코딩 [RECOMMENDED]
- `10.09` Bag of Words — Bag of Words [REFERENCE]
- `10.10` TF-IDF — TF-IDF [REFERENCE]
- `10.11` Word Embedding — 단어 임베딩 [CORE]
- `10.12` Word2Vec — Word2Vec [RECOMMENDED]
- `10.13` Sequence — 시퀀스 [CORE]
- `10.14` Language Modeling — 언어 모델링 [CORE]
- `10.15` NLP Evaluation Basics — NLP 평가 기초 [RECOMMENDED]

## 11. ATTENTION — 어텐션

Transformer의 핵심인 Attention 계산을 Q/K/V 이전부터 단계별로 분해합니다.

- `11.01` Why Attention? — 왜 Attention인가? [CORE]
- `11.02` Seq2Seq Bottleneck — Seq2Seq 병목 [CORE]
- `11.03` Attention Intuition — Attention 직관 [CORE]
- `11.04` Query / Key / Value — Query·Key·Value [CORE]
- `11.05` Similarity Score — 유사도 점수 [CORE]
- `11.06` Dot-product Attention — 내적 Attention [CORE]
- `11.07` Scaling — Scaling [CORE]
- `11.08` Softmax Weights — Softmax 가중치 [CORE]
- `11.09` Weighted Sum of Values — Value 가중합 [CORE]
- `11.10` Self-Attention — Self-Attention [CORE]
- `11.11` Causal / Masked Attention — Causal·Masked Attention [CORE]
- `11.12` Multi-Head Attention — Multi-Head Attention [CORE]
- `11.13` Attention Matrix — Attention 행렬 [CORE]
- `11.14` Attention Complexity — Attention 계산 복잡도 [ADVANCED]

## 12. TRANSFORMER — 트랜스포머

Attention을 중심으로 Transformer 블록과 전체 데이터 흐름을 조립합니다.

- `12.01` Why Transformer? — 왜 Transformer인가? [CORE]
- `12.02` Transformer Overview — Transformer 전체 구조 [CORE]
- `12.03` Input Embedding — 입력 임베딩 [CORE]
- `12.04` Positional Encoding — 위치 인코딩 [CORE]
- `12.05` Encoder Block — Encoder 블록 [CORE]
- `12.06` Decoder Block — Decoder 블록 [CORE]
- `12.07` Multi-Head Attention — Multi-Head Attention [CORE]
- `12.08` Feed Forward Network — Feed Forward Network [CORE]
- `12.09` Residual Connection — 잔차 연결 [CORE]
- `12.10` Layer Normalization — Layer Normalization [CORE]
- `12.11` Causal Mask — Causal Mask [CORE]
- `12.12` Cross Attention — Cross Attention [RECOMMENDED]
- `12.13` Output Projection — 출력 Projection [CORE]
- `12.14` Transformer Training Flow — Transformer 학습 흐름 [CORE]
- `12.15` Transformer Inference Flow — Transformer 추론 흐름 [CORE]

## 13. LANGUAGE MODEL — 언어 모델

언어 모델의 역사와 Encoder-only, Decoder-only, Encoder-Decoder 구조 차이를 이해합니다.

- `13.01` What is a Language Model? — 언어 모델이란? [CORE]
- `13.02` N-gram Language Model — N-gram 언어 모델 [REFERENCE]
- `13.03` Neural Language Model — 신경 언어 모델 [CORE]
- `13.04` Autoregressive Modeling — 자기회귀 모델링 [CORE]
- `13.05` Masked Language Modeling — Masked LM [RECOMMENDED]
- `13.06` Next Token Prediction — 다음 토큰 예측 [CORE]
- `13.07` Encoder-only Models — Encoder-only 모델 [CORE]
- `13.08` Decoder-only Models — Decoder-only 모델 [CORE]
- `13.09` Encoder-Decoder Models — Encoder-Decoder 모델 [CORE]
- `13.10` BERT Family Concepts — BERT 계열 개념 [RECOMMENDED]
- `13.11` GPT Family Concepts — GPT 계열 개념 [CORE]
- `13.12` T5 Family Concepts — T5 계열 개념 [REFERENCE]
- `13.13` Sequence Generation — 시퀀스 생성 [CORE]

## 14. LLM FOUNDATION — LLM 기초

대규모 언어 모델의 파라미터, 컨텍스트, 생성 과정과 한계를 이해합니다.

- `14.01` What is an LLM? — LLM이란? [CORE]
- `14.02` Foundation Model — 파운데이션 모델 [CORE]
- `14.03` Model Parameters — 모델 파라미터 [CORE]
- `14.04` Model Size — 모델 크기 [CORE]
- `14.05` Training Data — 학습 데이터 [CORE]
- `14.06` Pre-training — 사전 학습 [CORE]
- `14.07` Tokenization in LLMs — LLM 토큰화 [CORE]
- `14.08` Context Window — 컨텍스트 윈도우 [CORE]
- `14.09` Inference — 추론 [CORE]
- `14.10` Logits — 로짓 [CORE]
- `14.11` Probability Distribution — 확률 분포 [CORE]
- `14.12` Temperature — Temperature [CORE]
- `14.13` Top-K — Top-K [RECOMMENDED]
- `14.14` Top-P — Top-P [RECOMMENDED]
- `14.15` Sampling — 샘플링 [CORE]
- `14.16` Determinism & Seed — 결정성·Seed [REFERENCE]
- `14.17` Hallucination — 환각 [CORE]
- `14.18` Knowledge Cutoff Concept — 학습 지식 시점 개념 [RECOMMENDED]

## 15. LLM TRAINING & ALIGNMENT — LLM 학습과 정렬

Pre-training 이후 모델을 목적에 맞게 조정하는 주요 기법을 연결합니다.

- `15.01` Pre-training Objective — 사전학습 목적함수 [CORE]
- `15.02` Continued Pre-training — 추가 사전학습 [RECOMMENDED]
- `15.03` Fine-tuning — 파인튜닝 [CORE]
- `15.04` Supervised Fine-tuning — SFT [CORE]
- `15.05` Instruction Tuning — Instruction Tuning [CORE]
- `15.06` Parameter-efficient Fine-tuning — PEFT [CORE]
- `15.07` LoRA — LoRA [CORE]
- `15.08` QLoRA — QLoRA [RECOMMENDED]
- `15.09` Quantization Basics — 양자화 기초 [CORE]
- `15.10` Preference Data — 선호 데이터 [RECOMMENDED]
- `15.11` RLHF Concept — RLHF 개념 [RECOMMENDED]
- `15.12` Reward Model — Reward Model [ADVANCED]
- `15.13` DPO Concept — DPO 개념 [RECOMMENDED]
- `15.14` Alignment — Alignment [CORE]
- `15.15` Catastrophic Forgetting — 파국적 망각 [ADVANCED]
- `15.16` Evaluation after Fine-tuning — 파인튜닝 후 평가 [CORE]

## 16. EMBEDDING & VECTOR SEARCH — 임베딩과 벡터 검색

의미를 벡터로 표현하고 유사한 정보를 빠르게 검색하는 원리를 학습합니다.

- `16.01` What is an Embedding? — 임베딩이란? [CORE]
- `16.02` Embedding Space — 임베딩 공간 [CORE]
- `16.03` Dense vs Sparse Vector — Dense·Sparse 벡터 [CORE]
- `16.04` Semantic Similarity — 의미 유사도 [CORE]
- `16.05` Cosine Similarity — 코사인 유사도 [CORE]
- `16.06` Dot Product Similarity — 내적 유사도 [CORE]
- `16.07` Euclidean Distance — 유클리드 거리 [RECOMMENDED]
- `16.08` Embedding Model — 임베딩 모델 [CORE]
- `16.09` Vector Index — 벡터 인덱스 [CORE]
- `16.10` Exact vs Approximate Search — 정확 검색과 근사 검색 [CORE]
- `16.11` ANN — Approximate Nearest Neighbor [CORE]
- `16.12` HNSW Concept — HNSW 개념 [RECOMMENDED]
- `16.13` Vector Database — 벡터 데이터베이스 [CORE]
- `16.14` Metadata Filtering — 메타데이터 필터링 [CORE]
- `16.15` Semantic Search — 시맨틱 검색 [CORE]
- `16.16` Hybrid Search — 하이브리드 검색 [CORE]

## 17. RAG — 검색 증강 생성

외부 지식을 검색해 LLM 컨텍스트에 주입하는 전체 파이프라인을 설계합니다.

- `17.01` Why RAG? — 왜 RAG인가? [CORE]
- `17.02` RAG Architecture — RAG 전체 구조 [CORE]
- `17.03` Document Loading — 문서 로딩 [CORE]
- `17.04` Parsing & Cleaning — 파싱과 정제 [CORE]
- `17.05` Chunking — 청킹 [CORE]
- `17.06` Chunk Size & Overlap — Chunk 크기와 Overlap [CORE]
- `17.07` Embedding Documents — 문서 임베딩 [CORE]
- `17.08` Indexing — 인덱싱 [CORE]
- `17.09` Query Embedding — 질의 임베딩 [CORE]
- `17.10` Retrieval — 검색 [CORE]
- `17.11` Top-K Retrieval — Top-K 검색 [CORE]
- `17.12` Reranking — 재랭킹 [CORE]
- `17.13` Prompt Augmentation — 프롬프트 증강 [CORE]
- `17.14` Grounded Generation — 근거 기반 생성 [CORE]
- `17.15` Citations & Sources — 출처와 인용 [CORE]
- `17.16` Hybrid RAG — Hybrid RAG [RECOMMENDED]
- `17.17` Query Rewriting — Query Rewriting [RECOMMENDED]
- `17.18` Multi-query Retrieval — Multi-query 검색 [ADVANCED]
- `17.19` RAG Evaluation — RAG 평가 [CORE]
- `17.20` Retrieval Failure Modes — 검색 실패 유형 [CORE]

## 18. PROMPT & CONTEXT ENGINEERING — 프롬프트와 컨텍스트

모델 입력을 구조화하고 제한된 컨텍스트를 효과적으로 사용하는 방법을 학습합니다.

- `18.01` What is a Prompt? — 프롬프트란? [CORE]
- `18.02` System / User / Assistant Roles — 메시지 역할 [CORE]
- `18.03` Instruction Hierarchy Concept — 지시 계층 개념 [CORE]
- `18.04` Zero-shot Prompting — Zero-shot [CORE]
- `18.05` Few-shot Prompting — Few-shot [CORE]
- `18.06` Prompt Templates — 프롬프트 템플릿 [CORE]
- `18.07` Structured Output — 구조화 출력 [CORE]
- `18.08` Reasoning Prompt Patterns — 추론 프롬프트 패턴 [RECOMMENDED]
- `18.09` Context Window Management — 컨텍스트 윈도우 관리 [CORE]
- `18.10` Context Engineering — 컨텍스트 엔지니어링 [CORE]
- `18.11` Long Context Trade-offs — Long Context 트레이드오프 [RECOMMENDED]
- `18.12` Prompt Versioning — 프롬프트 버전 관리 [RECOMMENDED]
- `18.13` Prompt Evaluation — 프롬프트 평가 [CORE]
- `18.14` Prompt Injection Basics — Prompt Injection 기초 [CORE]

## 19. AI AGENT — AI 에이전트

LLM이 도구와 상태를 이용해 여러 단계를 수행하는 Agent 시스템을 이해합니다.

- `19.01` What is an AI Agent? — AI Agent란? [CORE]
- `19.02` Model + Tools + State — 모델·도구·상태 [CORE]
- `19.03` Function Calling — Function Calling [CORE]
- `19.04` Tool Use — 도구 사용 [CORE]
- `19.05` Tool Schema — 도구 Schema [CORE]
- `19.06` Agent Loop — Agent Loop [CORE]
- `19.07` Planning — 계획 [CORE]
- `19.08` State Management — 상태 관리 [CORE]
- `19.09` Short-term Memory — 단기 메모리 [CORE]
- `19.10` Long-term Memory — 장기 메모리 [RECOMMENDED]
- `19.11` Workflow vs Agent — Workflow와 Agent [CORE]
- `19.12` Human in the Loop — Human-in-the-loop [CORE]
- `19.13` Multi-Agent Concepts — Multi-Agent 개념 [RECOMMENDED]
- `19.14` Agentic RAG — Agentic RAG [CORE]
- `19.15` MCP Concepts — MCP 개념 [RECOMMENDED]
- `19.16` Agent Evaluation — Agent 평가 [CORE]
- `19.17` Tool Failure Handling — 도구 실패 처리 [CORE]

## 20. MULTIMODAL AI — 멀티모달 AI

텍스트뿐 아니라 이미지·음성·비디오를 함께 처리하는 모델 구조를 이해합니다.

- `20.01` What is Multimodal AI? — 멀티모달 AI란? [CORE]
- `20.02` Modality — 모달리티 [CORE]
- `20.03` Image + Text Representation — 이미지·텍스트 표현 [CORE]
- `20.04` Vision Encoder — Vision Encoder [CORE]
- `20.05` Vision-Language Model — Vision-Language Model [CORE]
- `20.06` Image Captioning — 이미지 캡셔닝 [RECOMMENDED]
- `20.07` Visual Question Answering — Visual QA [RECOMMENDED]
- `20.08` OCR vs Vision Model — OCR과 Vision Model [RECOMMENDED]
- `20.09` Speech Recognition — 음성 인식 [CORE]
- `20.10` Text to Speech — TTS [RECOMMENDED]
- `20.11` Audio Representation — 오디오 표현 [RECOMMENDED]
- `20.12` Multimodal Embedding — 멀티모달 임베딩 [CORE]
- `20.13` Multimodal Transformer — 멀티모달 Transformer [RECOMMENDED]
- `20.14` Video Understanding — 비디오 이해 [ADVANCED]

## 21. GENERATIVE MODELS — 생성 모델

LLM 외에도 데이터를 생성하는 주요 모델 계열의 핵심 아이디어를 비교합니다.

- `21.01` Generative vs Discriminative — 생성·판별 모델 [CORE]
- `21.02` Latent Representation — 잠재 표현 [CORE]
- `21.03` Autoencoder — 오토인코더 [CORE]
- `21.04` Variational Autoencoder — VAE [RECOMMENDED]
- `21.05` GAN Overview — GAN 개요 [CORE]
- `21.06` Generator & Discriminator — Generator와 Discriminator [CORE]
- `21.07` Diffusion Overview — Diffusion 개요 [CORE]
- `21.08` Forward Noise Process — Forward Noise 과정 [RECOMMENDED]
- `21.09` Reverse Denoising — 역방향 Denoising [CORE]
- `21.10` Latent Diffusion — Latent Diffusion [RECOMMENDED]
- `21.11` Text Conditioning — 텍스트 Conditioning [RECOMMENDED]
- `21.12` Sampling Steps & Guidance — Sampling Step과 Guidance [RECOMMENDED]
- `21.13` Generative Model Comparison — 생성 모델 비교 [CORE]

## 22. AI SYSTEM ENGINEERING — AI 시스템 엔지니어링

모델을 실제 서비스로 제공할 때 필요한 Serving, 확장성, 관측성을 학습합니다.

- `22.01` AI Application Architecture — AI 애플리케이션 아키텍처 [CORE]
- `22.02` Training vs Serving — Training과 Serving [CORE]
- `22.03` CPU vs GPU — CPU와 GPU [CORE]
- `22.04` GPU Memory / VRAM — GPU 메모리·VRAM [CORE]
- `22.05` Model Loading — 모델 로딩 [CORE]
- `22.06` Online Inference — 온라인 추론 [CORE]
- `22.07` Batch Inference — 배치 추론 [CORE]
- `22.08` Model Serving — 모델 서빙 [CORE]
- `22.09` Inference API — 추론 API [CORE]
- `22.10` Latency — Latency [CORE]
- `22.11` Throughput — Throughput [CORE]
- `22.12` Concurrency — 동시성 [CORE]
- `22.13` Batching — Batching [CORE]
- `22.14` Streaming Response — Streaming 응답 [CORE]
- `22.15` Caching — 캐싱 [CORE]
- `22.16` Autoscaling — 오토스케일링 [RECOMMENDED]
- `22.17` Queue & Backpressure — Queue와 Backpressure [RECOMMENDED]
- `22.18` Observability — 관측성 [CORE]
- `22.19` Model Gateway — Model Gateway [RECOMMENDED]

## 23. LLM PERFORMANCE & INFERENCE — LLM 성능과 추론 최적화

LLM Serving의 메모리·속도·비용을 결정하는 주요 요소를 이해합니다.

- `23.01` Inference Cost Anatomy — 추론 비용 구조 [CORE]
- `23.02` Prefill vs Decode — Prefill과 Decode [CORE]
- `23.03` KV Cache — KV Cache [CORE]
- `23.04` Token Throughput — Token Throughput [CORE]
- `23.05` Time to First Token — TTFT [CORE]
- `23.06` Tokens per Second — Tokens/sec [CORE]
- `23.07` Batching for LLMs — LLM Batching [CORE]
- `23.08` Continuous Batching — Continuous Batching [RECOMMENDED]
- `23.09` Quantization — 양자화 [CORE]
- `23.10` FP32 / FP16 / BF16 / INT8 — 숫자 정밀도 [CORE]
- `23.11` Model Parallelism — 모델 병렬화 [ADVANCED]
- `23.12` Tensor Parallelism — Tensor Parallelism [ADVANCED]
- `23.13` Pipeline Parallelism — Pipeline Parallelism [ADVANCED]
- `23.14` Speculative Decoding — Speculative Decoding [ADVANCED]
- `23.15` Memory vs Latency Trade-off — 메모리·Latency 트레이드오프 [CORE]
- `23.16` Cost Optimization — 비용 최적화 [CORE]

## 24. MLOPS & LLMOPS — MLOps와 LLMOps

데이터·모델·프롬프트·평가를 반복 가능하게 운영하는 생명주기를 학습합니다.

- `24.01` ML Lifecycle — ML 생명주기 [CORE]
- `24.02` Experiment Tracking — 실험 추적 [CORE]
- `24.03` Dataset Versioning — 데이터셋 버전 관리 [CORE]
- `24.04` Feature Store Concept — Feature Store 개념 [REFERENCE]
- `24.05` Model Versioning — 모델 버전 관리 [CORE]
- `24.06` Model Registry — Model Registry [CORE]
- `24.07` Training Pipeline — 학습 파이프라인 [CORE]
- `24.08` CI/CD for ML — ML CI/CD [CORE]
- `24.09` Model Deployment — 모델 배포 [CORE]
- `24.10` Canary / A-B Concepts — Canary·A/B 개념 [RECOMMENDED]
- `24.11` Model Monitoring — 모델 모니터링 [CORE]
- `24.12` Data Drift — Data Drift [CORE]
- `24.13` Concept Drift — Concept Drift [RECOMMENDED]
- `24.14` LLM Evaluation — LLM 평가 [CORE]
- `24.15` Prompt Versioning — 프롬프트 버전 관리 [CORE]
- `24.16` RAG Evaluation — RAG 평가 [CORE]
- `24.17` Agent Evaluation — Agent 평가 [CORE]
- `24.18` Feedback Loop — 피드백 루프 [CORE]
- `24.19` Cost & Usage Monitoring — 비용·사용량 모니터링 [CORE]

## 25. AI SECURITY, SAFETY & GOVERNANCE — AI 보안·안전·거버넌스

AI 시스템에서 발생하는 새로운 공격면과 데이터·모델·감사 통제를 이해합니다.

- `25.01` AI Threat Model — AI 위협 모델 [CORE]
- `25.02` Prompt Injection — Prompt Injection [CORE]
- `25.03` Indirect Prompt Injection — 간접 Prompt Injection [CORE]
- `25.04` Jailbreak Concept — Jailbreak 개념 [CORE]
- `25.05` Sensitive Data Leakage — 민감정보 유출 [CORE]
- `25.06` PII & Privacy — PII와 개인정보 [CORE]
- `25.07` Training Data Security — 학습 데이터 보안 [RECOMMENDED]
- `25.08` Model Access Control — 모델 접근통제 [CORE]
- `25.09` RAG Security — RAG 보안 [CORE]
- `25.10` Vector Store Security — Vector Store 보안 [CORE]
- `25.11` Agent Tool Security — Agent Tool 보안 [CORE]
- `25.12` Least Privilege for Agents — Agent 최소권한 [CORE]
- `25.13` Content Safety — 콘텐츠 안전 [CORE]
- `25.14` Guardrails — Guardrail [CORE]
- `25.15` Evaluation & Red Teaming — 평가와 Red Teaming [RECOMMENDED]
- `25.16` Audit Logging — 감사 로그 [CORE]
- `25.17` AI Governance — AI 거버넌스 [CORE]
- `25.18` Responsible AI Concepts — Responsible AI 개념 [CORE]

## 26. MODERN AI ARCHITECTURE — 현대 AI 아키텍처

현대 AI 시스템에서 자주 결합되는 모델·검색·Agent·멀티모달 패턴을 한눈에 연결합니다.

- `26.01` Foundation Model Architecture — Foundation Model 아키텍처 [CORE]
- `26.02` Small Language Models — Small Language Model [RECOMMENDED]
- `26.03` Mixture of Experts — Mixture of Experts [RECOMMENDED]
- `26.04` Dense vs MoE Models — Dense와 MoE 모델 [RECOMMENDED]
- `26.05` Long-context Architecture — Long-context 아키텍처 [RECOMMENDED]
- `26.06` RAG Application Architecture — RAG 애플리케이션 구조 [CORE]
- `26.07` Agent Application Architecture — Agent 애플리케이션 구조 [CORE]
- `26.08` Multimodal Application Architecture — 멀티모달 앱 구조 [RECOMMENDED]
- `26.09` Model Router — Model Router [RECOMMENDED]
- `26.10` AI Gateway — AI Gateway [CORE]
- `26.11` External Tools & APIs — 외부 도구와 API [CORE]
- `26.12` Memory & State Stores — Memory·State 저장소 [CORE]
- `26.13` Evaluation Layer — 평가 계층 [CORE]
- `26.14` Observability Layer — 관측성 계층 [CORE]
- `26.15` Security Boundary — 보안 경계 [CORE]

## 27. BUILD IT YOURSELF — 직접 구현 실습

JavaScript/TypeScript로 핵심 계산을 직접 구현해 추상 개념을 코드와 시각화로 고정합니다.

- `27.01` Build a Neuron — 뉴런 직접 구현 [CORE]
- `27.02` Build Activation Functions — 활성화 함수 구현 [CORE]
- `27.03` Build Linear Regression — 선형 회귀 구현 [CORE]
- `27.04` Build Gradient Descent — 경사하강법 구현 [CORE]
- `27.05` Build a Tiny Neural Network — 작은 신경망 구현 [CORE]
- `27.06` Visualize Forward Propagation — 순전파 시각화 [CORE]
- `27.07` Visualize Backpropagation — 역전파 시각화 [CORE]
- `27.08` Build Matrix Operations — 행렬 연산 구현 [CORE]
- `27.09` Build a Tokenizer — Tokenizer 구현 [CORE]
- `27.10` Build Embedding Similarity — 임베딩 유사도 실험 [CORE]
- `27.11` Build Self-Attention — Self-Attention 구현 [CORE]
- `27.12` Build Multi-Head Attention — Multi-Head Attention 구현 [RECOMMENDED]
- `27.13` Build a Mini Transformer — Mini Transformer 구현 [CORE]
- `27.14` Build Next-token Sampling — 다음 토큰 Sampling 구현 [CORE]
- `27.15` Build Vector Search — Vector Search 구현 [CORE]
- `27.16` Build a Mini RAG — Mini RAG 구현 [CORE]
- `27.17` Build Tool Calling — Tool Calling 구현 [CORE]
- `27.18` Build a Mini Agent — Mini Agent 구현 [CORE]
- `27.19` Add Evaluation — 평가 기능 추가 [CORE]
- `27.20` Add Observability — 관측성 추가 [RECOMMENDED]

## 28. AI RESEARCH & ADVANCED TOPICS — AI 연구·고급 주제

기초를 마친 뒤 논문과 최신 모델 구조를 읽기 위한 확장 개념을 정리합니다.

- `28.01` Reading AI Papers — AI 논문 읽는 법 [RECOMMENDED]
- `28.02` Benchmark & Dataset — Benchmark와 Dataset [CORE]
- `28.03` Scaling Laws — Scaling Law [ADVANCED]
- `28.04` Emergent Behavior Concept — Emergent Behavior 개념 [ADVANCED]
- `28.05` In-context Learning — In-context Learning [CORE]
- `28.06` Reasoning Models Concepts — Reasoning Model 개념 [RECOMMENDED]
- `28.07` Distillation — 지식 증류 [RECOMMENDED]
- `28.08` Synthetic Data — 합성 데이터 [RECOMMENDED]
- `28.09` Retrieval-augmented Models — Retrieval-augmented Model [ADVANCED]
- `28.10` Sparse Attention — Sparse Attention [ADVANCED]
- `28.11` State Space Models — State Space Model [ADVANCED]
- `28.12` Graph Neural Networks — Graph Neural Network [ADVANCED]
- `28.13` Reinforcement Learning for Agents — Agent용 강화학습 [ADVANCED]
- `28.14` Continual Learning — Continual Learning [ADVANCED]
- `28.15` Federated Learning — Federated Learning [ADVANCED]
