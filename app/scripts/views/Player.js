import {bind, wire} from 'hyperhtml';
// import Hls from 'hls.js'
import valechatti from '../../../valechatti.json';

/**
 * The HyperHTML view displaying the video player and channel details.
 */
export default class Player {
  /**
   * Default constructor for setting the values
   *
   * @param {HTMLElement} element - The HTML element to bind/adopt
   * @param {String} [url=null] - The URL to use
   * @param {Object} [program=null] - The program to render
   */
  constructor(element, url = null, program = null) {
    this.element = element;
    this.url = url;
    this.program = program;
  }

  parceMessages() {
    return ['testmsg1', 'testmsg']
  }
  /**
   * Renders the player.
   *
   * @return {HTMLElement} The rendered element
   */
  render() {
    console.log(`Render Player with url '${this.url}'`);

    const messages = this.parceMessages();
    const start = this.program.startTime;
    const time = `${start.getHours()}:${String(start.getMinutes()).padStart(2, '0')}`;
    const video = wire()`<video style="width: 100%;" ></video>`;
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(this.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED,
        function() {
        console.log('Try to play video');
          video.play();
          console.log('should be playing');
      });
    }


    return bind(this.element)`
      ${ video }
      <ul class="chat-messages" style="max-height:"> 
  
      ${ messages.map((message) => `<li>${message}</li>`)}
     </ul>
      <div class="mdc-card">
        <section class="mdc-card__primary">
          <h2 class="mdc-card__subtitle">${ time}</h2>
          <h1 class="mdc-card__title mdc-card__title--large">${ this.program.title}</h1>
        </section>
        <section class="mdc-card__supporting-text">${ this.program.description}</section>
        <section> aivot jäätyy </section>
      </div>
    `;
  }
}
