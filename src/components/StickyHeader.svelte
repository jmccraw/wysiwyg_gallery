<script>

</script>

<style type="text/scss">
  /*
  * Project CSS for the Decade's Best
  * Sticky header containing ESPN logo and social share icons
  */
  @import '../styles/vars';

  .decades-opener-sticky-header {
    align-items: center;
    background-color: transparent;
    box-sizing: border-box;
    display: flex;
    height: 38px;
    justify-content: flex-end;
    left: 0;
    padding: 15px 25px 0 24px;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 7;

    @media screen and (min-width: 617px) {
      height: 68px;
      padding-top: 0;
    }
  }

  .decades-opener-sticky-logo {
    left: 50%;
    position: absolute;
    transform: translateX(-50%);

    svg {
      height: 20px;
      width: 100px;
    }
  }

  .decades-opener-sticky-logo-svg {
    height: 20px;
    width: 100px;
  }

  .decades-opener-sticky-logo svg g {
    transition: fill 0.25s ease-in-out;
  }

  .decades-opener-sticky-logo:hover svg g {
    fill: $decades-blue;
    fill: var(--decades-accent, $decades-blue);
  }

  .decades-opener-sticky-social-container {
    align-items: center;
    display: none;
    justify-content: center;
    position: relative;

    @media screen and (min-width: 768px) {
      display: flex;
    }
  }

  .decades-opener-sticky-twitter-button,
  .decades-opener-sticky-facebook-button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    padding-top: 5px;
    touch-action: manipulation;

    svg path {
      transition: fill 0.25s ease-in-out;
    }
  }

  .decades-opener-sticky-twitter-button:hover svg path,
  .decades-opener-sticky-facebook-button:hover svg path {
    @media screen and (min-width: 768px) {
      fill: $decades-blue;
      fill: var(--decades-accent, $decades-blue);
    }
  }
</style>

<aside class="decades-opener-sticky-header">
  <a href="https://espn.com" class="decades-opener-sticky-logo"><svg class="decades-opener-sticky-logo-svg" height="20" viewBox="0 0 73 20" width="73" xmlns="https://www.w3.org/2000/svg"><g fill="#fff" fill-rule="evenodd" transform="translate(1 1)"><path d="m49.1871.0031s-6.851.001-12.611.001c-5.897 0-11.915 0-13.314-.001-2.656-.005-4.415 1.396-4.665 3.488-.092.77-.18 1.45-.18 1.45h34.542s.065-.51.116-.919c.263-2.107-.631-4.019-3.888-4.019"/><path d="m52.7278 6.8224s-.077.697-.183 1.457c-.21 1.506-1.332 2.627-3.418 2.627h-7.354l-.834 6.692h-5.855l1.328-10.776z"/><path d="m2.182 0 15.668.003-.613 4.938h-15.665z"/><path d="m1.3379 6.8224h15.665l-.506 4.084h-9.809l-.251 2.017h9.808l-.582 4.675h-15.663z"/><path d="m54.7634.0031h12.775c2.019 0 4.121.938 3.704 4.178-.076.581-.097.76-.097.76h-16.993z"/><path d="m53.9163 6.8208 5.859.003-1.336 10.772-5.859.002z"/><path d="m65.0462 6.8208 5.858.003-1.337 10.772-5.859.002z"/><path d="m31.0516 6.8263c-1.013 0-10.866-.004-12.867-.004-.433 2.813.974 4.084 2.968 4.084 1.085 0 7.926-.003 7.926-.003l-.25 2.02h-11.402l-.577 4.675s12.41.004 12.914 0c.414-.031 3.318-.109 4.308-2.484.322-.771.609-3.534.689-4.115.461-3.37-1.871-4.173-3.709-4.173"/></g></svg></a>
  <div class="decades-opener-sticky-social-container" data-title="Share">
    <button class="decades-opener-sticky-facebook-button" type="button" title="Share to Facebook"><svg height="21" viewBox="0 0 24 21" width="24" xmlns="https://www.w3.org/2000/svg"><path d="m6.49125081 19v-8.6668237h2.94880104l.44069993-3.37746519h-3.38950097v-2.15615535c0-.97832671.27478937-1.64461196 1.69669475-1.64461196l1.81205444-.00127886v-3.02066366c-.31367466-.04092347-1.38950097-.13300128-2.64031108-.13300128-2.61438756 0-4.40311083 1.57427475-4.40311083 4.46449485v2.49121626h-2.95657809v3.37746519h2.95657809v8.6668237z" fill="#fff" fill-rule="evenodd" transform="translate(6 1)"/></svg></button>
    <button class="decades-opener-sticky-twitter-button" type="button" title="Share to Twitter"><svg height="21" viewBox="0 0 24 21" width="24" xmlns="https://www.w3.org/2000/svg"><path d="m9.75951904 4.02466091c0-1.10480888.40080156-2.05178791 1.20240476-2.84093711.8027166-.79024524 1.7635271-1.1837238 2.8868849-1.1837238.586729 0 1.1411713.11179614 1.6622133.33538841.5221555.22359227.9686039.53267571 1.3426854.92615427.4542418-.09097137.902917-.21920811 1.3426854-.3836142.4419951-.16440608.8628368-.35840526 1.262525-.58199753-.1469606.46143307-.3807615.88450473-.7014028 1.27250308-.3206413.38799836-.6880427.70694616-1.101091.95684341.4130483-.05260995.8171899-.13152487 1.2124248-.23674476.3930082-.1052199.7704298-.23674476 1.1311512-.3945746-.2672011.40772708-.573369.78586107-.9218437 1.13440197-.346248.3485409-.7203295.6674887-1.1222445.9568434.0133601.07891492.0211534.16111796.0211534.24551309v.26743389c0 1.32949719-.2582943 2.67981915-.7726564 4.05425401-.5132487 1.37443485-1.2614117 2.61076856-2.244489 3.70900126-.9819639 1.0982326-2.2010688 1.9958898-3.6562013 2.6929716-1.45735911.6959858-3.12736579 1.0456227-5.01001999 1.0456227-1.15007794 0-2.25896237-.161118-3.32776665-.4833539-1.06880427-.3233319-2.05744823-.7661323-2.96593186-1.3316893.16032064.0131525.3239813.0230169.4920953.0295931.16588733.0065763.33066132.0098644.48986863.0098644.96192385 0 1.88154086-.1512536 2.75662436-.4537608.87397016-.3025072 1.6588733-.7244828 2.35359608-1.2626387-.89512358-.0120564-1.69561345-.2860666-2.40480962-.8187423-.70808283-.5326757-1.18793142-1.1935882-1.44288577-1.98273736.13360053.01315249.26386105.02630498.3918949.03945746.12580717.01315249.25606769.01972873.38966822.01972873.1736807 0 .35515476-.00986436.54108217-.02959309.18704075-.01972873.36851481-.05589807.5421955-.10850802-.93631708-.18413481-1.7178802-.64447184-2.34580272-1.3810111-.62792251-.73653925-.94077043-1.59802712-.94077043-2.58446362v-.03945746c.26608774.14467735.55778224.25976161.87174349.34415673.31284792.08768325.63682922.13590903.97083055.14906152-.54776219-.35511714-.98864395-.82860666-1.32264529-1.42046856-.332888-.5918619-.501002-1.23633374-.501002-1.93341554 0-.36826962.0501002-.72667488.1503006-1.07521578.10131374-.34854089.23714095-.6674887.41082164-.9568434 1.00311735 1.22318126 2.23780895 2.20961775 3.70741483 2.95930949 1.47071922.74969174 3.05277221 1.17057131 4.75061234 1.26263872-.04008016-.14467735-.06791361-.29593095-.08016032-.45376079-.0144734-.15782984-.02115342-.31565968-.02115342-.47348952" fill="#fff" fill-rule="evenodd" transform="translate(2 3)"/></svg></button>
  </div>
</aside>
