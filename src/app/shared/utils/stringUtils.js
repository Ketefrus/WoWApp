export default {

  /**
   * Check if a string is blank, null or undefined
   *
   * @param str string target
   */
  isBlank(str) {
    return !str || /^\s*$/.test(srt);
  },

  slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
      .replace(/[\u0300-\u036f]/g, ''); // Replace accentuated characters
  },

  formatStringPrice(value) {
    let val = (value/1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  },

  setTwoNumberDecimal(value) {
    let val = parseFloat(value).toFixed(2);
    return val;
  },

  dateTimeFormat(date) {
    return moment(date).format('DD/MM/YYYY HH:mm:ss')
  },

  dateFormat(date) {
    return moment(date).format('DD/MM/YYYY')
  },

  timeFormat(date) {
    return moment(date).format('hh:mm:ss')
  },
  timeHour(date) {
    return moment(date).format('HH:mm')
     // new Date(date).getHours();
  },

  validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  getItemColor(itemName) {
    return itemName === 'EPIC' ? 'epic'
      : itemName === 'LEGENDARY' ? 'legendary'
      : itemName === 'RARE' ? 'rare'
      : itemName === 'UNCOMMON' ? 'uncommon' : '';
  },
  getStatColor(stat) {
    return stat === 'intelecto' ? 'stat-intellect'
    : stat === 'fuerza' ? 'stat-strength'
    : stat === 'agilidad' ? 'stat-agility'
    : stat === 'crítico' ? 'stat-criticalstrike'
    : stat === 'celeridad' ? 'stat-haste'
    : stat === 'maestría' ? 'stat-mastery'
    : stat === 'versatilidad' ? 'stat-versatility'
    : stat === 'aguante' ? 'stat-stamina' : '';
  },
  getStatIcon(stat) {
    return stat === 'intelecto' ? 'cil-lightbulb' 
    : stat === 'aguante' ? 'cil-medical-cross'
    : stat === 'crítico' ? 'cil-bolt' 
    : stat === 'agilidad' ? 'cil-paw'
    : stat === 'celeridad' ? 'cil-clock'
    : stat === 'maestría' ? 'cil-school'
    : stat === 'versatilidad' ? 'cil-gem' : ''
  },
  getClassColor(className) {
    return className === 'Pícaro' ? 'warning'
      : className === 'Druida' ? 'danger'
        : className === 'FINISHED' ? 'bg-gradient-success' : 'bg-gradient-light'
  },
};
// color: rgb(217, 165, 25) Rogue