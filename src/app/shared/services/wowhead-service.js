import axios from 'axios';

// Request the icon to zaming to reduce API calls to Blizzard
const iconURL = 'https://wow.zamimg.com/images/wow/icons/small';
// WoWHead can give you HTML tooltips for your hover options
const tooltipWoWHead = 'https://www.wowhead.com/tooltip/spell';

const fetchTooltip = (spellId) => {
  return axios.get(`${tooltipWoWHead}/${spellId}`);
}

const fetchIcon = (spellName) => {
  return axios.get(`${iconURL}/${spellName}.jpg`);
}



export {
  fetchTooltip,
  fetchIcon
}
