const LitElement = Object.getPrototypeOf(
  customElements.get("home-assistant-main")
);
const { html, css } = LitElement.prototype;

const PREDEFINED = ['last-changed', 'entity-id', undefined]

class ExtendedEntityRow extends LitElement {
  static get properties() {
    return {
      _hass: { type: Object },
      config: { type: Object },
      entity: { type: Object },
    };
  }

  setConfig(config) {
    if (!config.entity)
      throw new Error('Specify an entity.');

    this.config = {
      primary_info: '[[ state ]]',
      ...config,
    };
  }

  set hass(hass) {
    this._hass = hass;
    const entity = hass.states[this.config.entity];
    if (entity && this.entity !== entity)
      this.entity = entity;
  }

  get hass() { return this._hass; }

  get uom() {
    if(this.config.primary_info === '[[ state ]]')
      return this.entity.attributes.unit_of_measurement || '';
  }

  get isCustomSecondary() {
    return !PREDEFINED.includes(this.config.secondary_info);
  }

  shouldUpdate(changedProps) {
    return changedProps.has('entity');
  }

  render() {
    return html`
      <hui-generic-entity-row
        .hass=${this.hass}
        .config=${this.config}
        .showSecondary=${!this.isCustomSecondary}>
        <span>
          ${this.computeTemplate(this.config.primary_info)} ${this.uom}
        </span>
        ${this.renderInfo()}
      </hui-generic-entity-row>
    `;
  }

  renderInfo() {
    if (this.isCustomSecondary)
      return html`
        <span slot='secondary'>
          ${this.computeTemplate(this.config.secondary_info)}
        </span>`;
  }

  computeTemplate(template) {
    return template.replace(/(\[\[.*?\]\])/g, (str) => {
      str = str.split('[[').pop().split(']]')[0].trim().split(".");
      return str.reduce((prev, curr) => (
        prev ? prev[curr] : null
      ), this.hass.states[this.config.entity]) || str;
    });
  }
}

customElements.define('extended-entity-row', ExtendedEntityRow);
