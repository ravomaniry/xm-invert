const { invertXml } = require('..');

describe('invertXml', () => {
  it('Moves child nodes with scalar values into attributes', async () => {
    const raw = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<dataroot xmlns:od="urn:schemas-microsoft-com:officedata">',
      '  <MCM_MC_x007E_1>',
      '    <ID>1</ID>',
      '    <CONTRACT_X0020_NO>C1</CONTRACT_X0020_NO>',
      '    <CATEGORY>100</CATEGORY>',
      '  </MCM_MC_x007E_1>',
      '  <MCM_MC_x007E_1>',
      '    <ID>2</ID>',
      '    <CONTRACT_X0020_NO>C2</CONTRACT_X0020_NO>',
      '    <CATEGORY>200</CATEGORY>',
      '  </MCM_MC_x007E_1>',
      '</dataroot>',
    ].join('\n');
    const inverted = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<dataroot xmlns:od="urn:schemas-microsoft-com:officedata">',
      '  <MCM_MC_x007E_1 ID="1" CONTRACT_X0020_NO="C1" CATEGORY="100"></MCM_MC_x007E_1>',
      '  <MCM_MC_x007E_1 ID="2" CONTRACT_X0020_NO="C2" CATEGORY="200"></MCM_MC_x007E_1>',
      '</dataroot>',
      '',
    ].join('\n');
    expect(invertXml(raw)).toBe(inverted);
  });
});
