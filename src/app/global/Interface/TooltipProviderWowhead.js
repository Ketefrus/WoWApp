import Base from './TooltipProviderBase';

class TooltipProviderWowhead extends Base {
  static libraryUrl = '//wow.zamimg.com/widgets/power.js';
  static baseUrl = 'http://es.wowhead.com/';

  static spellRelative(id, details) {
    const base = `spell=${id}`;
    if (!details) {
      return base;
    } else {
      const queryString = [base];
      if (details.ilvl) {
        queryString.push(`ilvl=${details.ilvl}`);
      }
      return queryString.join('&');
    }
  }
  static itemRelative(id, details) {
    const base = `item=${id}`;
    if (!details) {
      return base;
    } else {
      const queryString = [base];
      if (details.gems && details.gems.length > 0) {
        queryString.push(`gems=${details.gems.map((gem) => gem.id).join(':')}`);
      }
      if (details.permanentEnchant) {
        queryString.push(`ench=${details.permanentEnchant}`);
      }
      if (details.bonusIDs && details.bonusIDs.length > 0) {
        queryString.push(`bonus=${details.bonusIDs.join(':')}`);
      }
      return queryString.join('&');
    }
  }

}

export default TooltipProviderWowhead;
