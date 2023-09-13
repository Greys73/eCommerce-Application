import '../../../assets/styles/pages/about.scss';

import logoRSSimg from '../../../assets/images/rs_school.png';

const aboutPage = document.createElement('div');

const rssLink = document.createElement('a');
rssLink.classList.add('about__rss-link');
rssLink.href = 'https://rs.school/js/';

const rssLogo = document.createElement('img');
rssLogo.classList.add('about__rss-img');
rssLogo.alt = 'RSS Logo';
rssLogo.src = logoRSSimg;

rssLink.append(rssLogo);

aboutPage.append(rssLink);

export default aboutPage;
