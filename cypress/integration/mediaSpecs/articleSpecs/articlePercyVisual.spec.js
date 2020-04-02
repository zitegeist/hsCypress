const basePath = 'https://www.hsnb.io/p';
const query = '?perf_test=1';

const Standard = ['beams-ziploc-accessories', 'dries-van-noten-ss19-pattern', 'drake-ovo-shoes-collaborations'];
const Story = ['nike-zoom-vaporfly-fashion-influence', 'stanley-kubrick', '3d-printing-vojd-studio-me-convention'];
const Parallax = [
  'balmain-new-sneaker-collection-film-vitali-gelwich',
  'mens-tennis-fashion',
  'new-balance-990-legends-made',
];

const Tests = { Standard, Story, Parallax };

describe('HighSnobiety | Article | Layout Tests', () => {
  let getIframeDummy = () => ''; // eslint-disable-line lodash/prefer-constant

  before(() => {
    cy.fixture('iframe.html').then(d => {
      getIframeDummy = originalUrl =>
        `data:text/html;charset=utf-8,${encodeURIComponent(d.replace('<!-- REPLACE_PLACEHOLDER -->', originalUrl))}`;
    });
  });

  beforeEach(() => {
    cy.setCookie('hs_popover_displayed', '1'); // hide newsletter popup
  });

  Object.entries(Tests).map(([layout, slugs]) => {
    return describe(`Layout: ${layout}`, () => {
      slugs.forEach(slug => {
        const testname = `${layout} | ${slug}`;
        it(testname, () => {
          cy.authVisit(`${basePath}/${slug}/${query}`);

          let hasVideo = false;
          let hasIframe = false;
          let hasImage = false;

          cy.get('body').then(el => {
            const images = el.find('img');
            hasImage = !!(images && images.length);

            const videos = el.find('[class*=contentElementExternalVideo]');
            hasVideo = !!(videos && videos.length);

            const iframes = el.find('iframe');
            hasIframe = !!(iframes && iframes.length);
          });

          if (hasVideo) {
            cy.get('[class*=contentElementExternalVideo] iframe').should('be.visible');
          }

          if (hasImage) {
            cy.get('img').should('be.visible');
          }

          if (hasIframe) {
            cy.get('iframe').should('be.visible');
          }

          cy.get('iframe').then(iframes => {
            iframes.each((key, frame) => {
              const originalUrl = frame.getAttribute('src');
              const newUrl = getIframeDummy(originalUrl);
              frame.setAttribute('src', newUrl);
            });
          });

          cy.percySnapshot(testname, {
            percyCSS: `
          div[class*="marketingStrip"] {
            color: black
          }
          .section-popular-posts,
          .section-related-posts,
          .section-latest-posts {
            opacity: 0;
          }
          `,
            requestHeaders: {
              Authorization: 'Basic staging:hsnb',
            },
          });
        });
      });
    });
  });
});
