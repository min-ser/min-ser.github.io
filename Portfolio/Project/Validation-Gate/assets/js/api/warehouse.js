window.WarehouseDemoAPI = (() => {
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const validEndpoint = value => /^[a-z0-9-]+\.datawarehouse\.fabric\.microsoft\.com$/i.test(value.trim());
  const rows = [
    { MATERIAL_NUMBER:"KMS201012080003", MATERIAL_CODE:"6018805", TEMPORARY_MATERIAL_CODE:"10101159", SAP_MATERIAL_NAME:"(KMS) PARSLEY EXTRACT", MATERIAL_TYPE_CODE:"MAT010", MATERIAL_VERSION:"1" },
    { MATERIAL_NUMBER:"KMS201100001795", MATERIAL_CODE:"6018336", TEMPORARY_MATERIAL_CODE:"11096743", SAP_MATERIAL_NAME:"KMS DETERGENT JC-300", MATERIAL_TYPE_CODE:"MAT010", MATERIAL_VERSION:"1" },
    { MATERIAL_NUMBER:"KMS201200000154-C", MATERIAL_CODE:"6024728", TEMPORARY_MATERIAL_CODE:"17103313", SAP_MATERIAL_NAME:"APP COMPLEX (DEMO)", MATERIAL_TYPE_CODE:"MAT010", MATERIAL_VERSION:"1" },
    { MATERIAL_NUMBER:"KMS201100000967-C", MATERIAL_CODE:"6024671", TEMPORARY_MATERIAL_CODE:"17103347", SAP_MATERIAL_NAME:"KMS EXTRACT (DEMO)", MATERIAL_TYPE_CODE:"MAT010", MATERIAL_VERSION:"1" },
    { MATERIAL_NUMBER:"KMS201300000271", MATERIAL_CODE:"6030210", TEMPORARY_MATERIAL_CODE:"18104401", SAP_MATERIAL_NAME:"VALIDATION SAMPLE MATERIAL", MATERIAL_TYPE_CODE:"MAT020", MATERIAL_VERSION:"2" },
    { MATERIAL_NUMBER:"KMS201400000821", MATERIAL_CODE:"6039812", TEMPORARY_MATERIAL_CODE:"19105508", SAP_MATERIAL_NAME:"PRIVATE LINK TEST ITEM", MATERIAL_TYPE_CODE:"MAT020", MATERIAL_VERSION:"1" },
    { MATERIAL_NUMBER:"KMS201500000115", MATERIAL_CODE:"6041022", TEMPORARY_MATERIAL_CODE:"20106001", SAP_MATERIAL_NAME:"WAREHOUSE DEMO ITEM", MATERIAL_TYPE_CODE:"MAT030", MATERIAL_VERSION:"3" }
  ];

  async function query(payload) {
    await wait(850);
    if (!validEndpoint(payload.endpoint)) {
      return { success:false, error:"DNS_ERROR", message:"Warehouse FQDN 형식이 올바르지 않습니다.", rows:[], demoMode:true };
    }
    if (!payload.database || !payload.schema || !payload.table) {
      return { success:false, error:"INPUT_ERROR", message:"Database, Schema, Table 값을 모두 입력하세요.", rows:[], demoMode:true };
    }
    const top = Math.max(1, Math.min(100, Number(payload.top) || 5));
    const resultRows = rows.slice(0, top);
    const order = payload.mode === "code" ? "MATERIAL_CODE ASC" : payload.mode === "all" ? "(none)" : "MATERIAL_NUMBER DESC";
    return {
      success:true,
      endpoint:payload.endpoint,
      database:payload.database,
      schema:payload.schema,
      table:payload.table,
      mode:payload.mode,
      sql:`SELECT TOP (${top}) * FROM [${payload.schema}].[${payload.table}]${order === "(none)" ? "" : ` ORDER BY ${order}`}`,
      rows:resultRows,
      rowCount:resultRows.length,
      driver:"ODBC Driver 17 for SQL Server",
      authentication:"Microsoft Entra workload identity (demo)",
      privateLink:true,
      demoMode:true
    };
  }
  return { query };
})();
