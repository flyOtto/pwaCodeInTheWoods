import {bind, wire} from 'hyperHTML';

/**
 * The HyperHTML view displaying the channel guide.
 */
export default class ChannelGuide {
  /**
   * Default constructor for setting the values
   *
   * @param {HTMLElement} element - The HTML element to bind/adopt
   * @param {Array<Object>} [programs=null] - The array containing program data POJOs
   */
  constructor(element, programs = null) {
    this.element = element;
    this.programs = programs;
  }

  /**
   * Renders the channel guide.
   *
   * @return {HTMLElement} The rendered element
   */
  render() {
    console.log(`Render channel guide, ${this.programs.length} elements`);

    return bind(this.element)`
      ${ this.programs.map((p) => wire()`
        <div class="mdc-card">
          <section class="mdc-card__primary">
            <h2 class="mdc-card__subtitle">
              ${ p.startTime.getHours() }:${ String(p.startTime.getMinutes()).padStart(2, '0') }
            </h2>
            <h1 class="mdc-card__title mdc-card__title--large">${ p.title }</h1>
          </section>
          <section class="mdc-card__supporting-text">${ p.description }</section>
          <section class="mdc-card__actions" style="justify-content: flex-end">
            ${ p.playbackUrl ?
              wire()`<a href="${p.playbackUrl}"
              class="mdc-button mdc-button--raised mdc-button--accent mdc-card__action">Katso</a>` :
              wire()``
            }
          </section>
        </div>
      `)}
    `;

    // Attach the scroller - this is done after templating to permit the right behaviour
    // const tabBarScroller =
    //  new MDCTabBarScroller(document.querySelector('.mdc-tab-bar-scroller'));
  }
}
