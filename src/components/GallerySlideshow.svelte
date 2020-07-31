<script>
  import { fade } from 'svelte/transition';

</script>

<style type="text/scss">
  @import '../styles/vars';

/*
 * Project CSS for the Decade's Best
 * Gallery embeds
 */
.decades-gallery {
  margin: 0 auto;
  max-width: 600px;
  overflow: hidden;
  position: relative;
  width: calc(100% - 32px);

  @media screen and (min-width: 375px) {
    width: calc(100% - 36px);
  }

  @media screen and (min-width: 414px) {
    width: calc(100% - 72px);
  }

  @media screen and (min-width: 664px) {
    width: 100%;
  }
}

.decades-gallery.is-big {
  margin-top: -46px;
  max-width: 1000px;
  opacity: 0;
  transform: translateY(150px);
  width: 100vw;

  @media screen and (max-width: 623px) {
    margin-top: -24px;
  }
}

.decades-gallery.is-big:last-child {
  margin-top: 32px;
  opacity: 1;
  transform: none;

  .decades-gallery-nav {
    opacity: 1;
  }
}

.decades-gallery-slider {
  display: flex;
  flex-shrink: 1;
  transform: translate3d(0, 0, 0);
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out;
}

.decades-gallery-item {
  flex-shrink: 0;
  margin: 0 auto 26px;
  max-width: 600px;
  width: calc(100% - 32px);

  &:last-of-type {
    margin-bottom: 0;
  }

  @media screen and (min-width: 375px) {
    width: calc(100vw - 36px);
  }

  @media screen and (min-width: 414px) {
    width: calc(100vw - 72px);
  }

  @media screen and (min-width: 664px) {
    width: 100vw;
  }
}

.decades-gallery .decades-gallery-item {
  width: 100%;
}

.decades-gallery-item .body-text a {
  border-bottom: 1px dashed $decades-red;
  color: currentColor;
  text-decoration: none;
  transition: color 0.25s ease-in-out;

  @media screen and (min-width: 768px) {
    &:hover {
      border-bottom-style: solid;
      color: $decades-red;
    }
  }

  &:active {
    border-bottom: 1px solid currentColor;
    color: $decades-active-red;
  }
}

.decades-gallery.is-big .decades-gallery-item {
  margin-left: 0;
  margin-right: 0;
  max-width: 1000px;

  &:last-of-type {
    margin-bottom: 26px;
  }
}

.decades-gallery-image {
  border-top: 1px solid $decades-red;
  height: auto;
  // max-height: calc(600px * 0.745);
  opacity: 1;
  padding-top: 32px;
  pointer-events: none;
  transition: opacity 0.25s ease-in;
  width: 100%;

  &.is-lazy {
    opacity: 0;
  }
}

.decades-gallery.is-inline .decades-gallery-image {
  border-top: none;
  padding-top: 0;

  &.is-lazy {
    opacity: 1;
  }
}

.decades-container-hed:not(.no-motion) + .decades-gallery-item .decades-gallery-image {
  border-top: none;
  margin-top: -46px;
}

.decades-container-hed.no-motion + .decades-gallery-item .decades-gallery-image {
  border-top: none;
  padding-top: 14px;
}

.decades-gallery.is-big .decades-gallery-image {
  border-top: none;
  max-height: 734px;
  padding-top: 0;

  @media screen and (max-width: 999px) {
    max-height: 73.4vw;
  }
}

.decades-gallery-caption {
  color: #333;
  font-weight: normal;
  opacity: 1;
  margin: 4px auto 0;
  max-width: calc(100vw - 32px);
  transition: opacity 0.25s ease-in;

  @media screen and (min-width: 375px) {
    max-width: calc(100vw - 36px);
  }

  @media screen and (min-width: 414px) {
    max-width: calc(100vw - 72px);
  }

  @media screen and (min-width: 664px) {
    max-width: 600px;
  }

  @media screen and (min-width: 768px) {
    margin-top: -1px;
  }
}

.decades-gallery-image.is-lazy + .decades-gallery-caption {
  opacity: 0;
}

// TODO FIXME Need to adjust this for future .is-big galleries
.decades-gallery.is-big .decades-gallery-caption {
  opacity: 0;
  margin-top: 14px;
  transition: opacity 0.25s ease-in-out;
}

.decades-gallery.is-inline .decades-gallery-image.is-lazy + .decades-gallery-caption,
.decades-gallery.is-big .decades-gallery-item.is-active .decades-gallery-caption {
  opacity: 1;
}

.decades-gallery-caption-index {
  color: $decades-red;
  font-size: 15px;
}

.decades-gallery-caption .body-text {
  margin: 5px 0 0;

  .credit {
    color: $decades-grey-3;
    color: $decades-credit-color;
    display: inline;
  }

  .credit.is-right {
    display: block;
    margin-right: -1px;
    margin-top: -3px;
    text-align: right;
  }

  @media screen and (min-width: 768px) {
    margin-top: -2px;
  }
}

// TODO FIXME Adjust top so it's centered no matter what length caption text
.decades-gallery-nav {
  align-items: center;
  display: flex;
  justify-content: space-between;
  left: 0;
  opacity: 0;
  padding: 0 20px;
  position: absolute;
  // Half of the 432px height of gallery image, minus 24px for half button height, plus half padding-top
  top: 208px;
  transition: opacity 0.25s ease-in-out 0.25s;
  width: calc(100% - 40px);
  z-index: 3;

  &.is-visible {
    opacity: 1;
  }

  @media screen and (max-width: 623px) {
    padding-left: 16px;
    padding-right: 16px;
    top: calc((100% - 44px) * 0.75 / 2 - 16px);
    top: calc((100% - 44px) * var(--decades-ratio, 0.75) / 2 - 16px);
    width: calc(100% - 32px);
  }

  @media screen and (max-width: 359px) {
    top: calc((100% - 32px) * 0.75 / 2 - 16px);
    top: calc((100% - 32px) * var(--decades-ratio, 0.75) / 2 - 16px);
  }
}

.decades-gallery.is-big .decades-gallery-nav {
  // Half of the 745px height of the big gallery image, minus 24px for half the height of buttons
  top: 349px;

  @media screen and (max-width: 999px) {
    top: calc(37.25vw - 24px);
  }

  @media screen and (max-width: 623px) {
    top: calc(37.25vw - 16px);
  }
}

.decades-gallery.is-inline .decades-gallery-nav {
  opacity: 1;
  top: 92px;
  transition: opacity 0.25s ease-in-out 0.25s;

  &.is-lazy-thing {
    opacity: 0;
  }

  @media screen and (min-width: 375px) {
    top: calc((75vw - 36px) / 2 - 16px);
    top: calc((100vw - 36px) * var(--decades-ratio, 0.75) / 2 - 16px);
  }

  @media screen and (min-width: 414px) {
    top: calc((75vw - 72px) / 2 - 16px);
    top: calc((100vw - 72px) * var(--decades-ratio, 0.75) / 2 - 16px);
  }

  @media screen and (min-width: 664px) {
    top: calc(600px * 0.75 / 2 - 22px);
    top: calc(600px * var(--decades-ratio, 0.75) / 2 - 22px);
  }
}

.decades-gallery-nav-button {
  background-color: rgba(255, 255, 255, 0.85);
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  height: 44px;
  outline: none;
  padding: 5px 0 0;
  position: relative;
  touch-action: manipulation;
  transition: background-color 0.25s ease-in-out,
    opacity 0.25s ease-in-out 1.25s;
  width: 44px;

  svg {
    @media screen and (min-width: 664px) {
      transform: translateX(2px);
    }
  }

  &.is-left svg {
    transform: rotate(180deg) translateX(1px);

    @media screen and (max-width: 663px) {
      transform: rotate(180deg) translateX(2px);
    }
  }

  svg path {
    stroke: $decades-red;
    transition: stroke 0.25s ease-in-out;
  }

  @media screen and (max-width: 663px) {
    height: 32px;
    padding-left: 3px;
    width: 32px;
  }
}

.decades-gallery-nav-button:hover {
  @media screen and (min-width: 768px) {
    background-color: rgba(221, 0, 0, 0.85);

    svg path {
      stroke: #fff;
    }
  }
}

.decades-gallery-nav-button:active {
  background-color: $decades-active-red;
  transition: none;

  svg path {
    stroke: #fff;
    transition: none;
  }
}

.decades-gallery-nav-button svg {
  @media screen and (max-width: 623px) {
    height: 15px;
  }
}
</style>

<article class="decades-gallery is-inline">
  <div class="decades-gallery-slider">
    <figure class="decades-gallery-item">
      <img class="decades-gallery-image is-lazy" src="https://a.espncdn.com/prod/styles/pagetype/otl/20200302_female_nba_coaches/images/placeholder-image.jpg" data-src="https://a.espncdn.com/prod/styles/pagetype/otl/20200302_female_nba_coaches/images/becky-hammon/finals/hammon_sas_01_1200x900.jpg">
      <figcaption class="decades-gallery-caption subhead alt"><span class="decades-gallery-caption-index text-color-black">1/4</span> <p class="body-text">The respect for Hammon from young players like Dejounte Murray (5) and veterans like LaMarcus Aldridge has been there from day one. &#8220;The players have been amazing,&#8221; Hammon said. &#8220;They&#8217;re the best part of the job. No doubt.&#8221; <span class="credit">Ronald Cortes/Getty Images</span></p></figcaption>
    </figure>

    <figure class="decades-gallery-item">
      <img class="decades-gallery-image is-lazy" src="https://a.espncdn.com/prod/styles/pagetype/otl/20200302_female_nba_coaches/images/placeholder-image.jpg" data-src="https://a.espncdn.com/prod/styles/pagetype/otl/20200302_female_nba_coaches/images/becky-hammon/finals/hammon_sas_02_1200x900.jpg">
      <figcaption class="decades-gallery-caption subhead alt"><span class="decades-gallery-caption-index text-color-black">2/4</span> <p class="body-text">&#8220;There&#8217;s a real brotherhood going on here [in the NBA], too,&#8221; Hammon said. &#8220;The resistance is real sometimes. They&#8217;re not all happy we&#8217;re here. It&#8217;s a super-competitive field. And the women are here to compete.&#8221; <span class="credit">Celeste Sloman for ESPN</span></p></figcaption>
    </figure>

    <figure class="decades-gallery-item">
      <img class="decades-gallery-image is-lazy" src="https://a.espncdn.com/prod/styles/pagetype/otl/20200302_female_nba_coaches/images/placeholder-image.jpg" data-src="https://a.espncdn.com/prod/styles/pagetype/otl/20200302_female_nba_coaches/images/becky-hammon/finals/hammon_sas_03_1200x900.jpg">
      <figcaption class="decades-gallery-caption subhead alt"><span class="decades-gallery-caption-index text-color-black">3/4</span> <p class="body-text">Seven years before he hired her, coach Gregg Popovich (middle) was watching Hammon&#8217;s WNBA career closely. &#8220;He brought me in when I was injured [in 2013] because he wanted to see how I mingled, how I fit in,&#8221; Hammon said. <span class="credit">David Berding/Getty Images</span></p></figcaption>
    </figure>

    <figure class="decades-gallery-item">
      <img class="decades-gallery-image is-lazy" src="https://a.espncdn.com/prod/styles/pagetype/otl/20200302_female_nba_coaches/images/placeholder-image.jpg" data-src="https://a.espncdn.com/prod/styles/pagetype/otl/20200302_female_nba_coaches/images/becky-hammon/finals/hammon_sas_04_1200x900.jpg">
      <figcaption class="decades-gallery-caption subhead alt"><span class="decades-gallery-caption-index text-color-black">4/4</span> <p class="body-text">&#8220;Women are going to continue to push the envelope and continue to do a great job,&#8221; Hammon said. &#8220;People ask, &#8216;What can you do?&#8217; I&#8217;m like, &#8216;Do your best.&#8217; That has been enough, it will be enough.&#8221; <span class="credit">Celeste Sloman for ESPN</span></p></figcaption>
    </figure>
  </div>

  <div class="decades-gallery-nav is-lazy-thing" style="--decades-ratio: 0.75;">
    <button class="decades-gallery-nav-button is-left" type="button" title="Previous Image"><svg height="21" viewBox="0 0 13 21" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m15 20 9 9 9-9" fill="none" stroke="#000" stroke-width="3" transform="matrix(0 -1 1 0 -18.5 34.5)"/></svg></button>
    <button class="decades-gallery-nav-button is-right" type="button" title="Next Image"><svg height="21" viewBox="0 0 13 21" width="13" xmlns="http://www.w3.org/2000/svg"><path d="m15 20 9 9 9-9" fill="none" stroke="#000" stroke-width="3" transform="matrix(0 -1 1 0 -18.5 34.5)"/></svg></button>
  </div>
</article>
