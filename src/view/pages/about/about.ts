import '../../../assets/styles/pages/about.scss';

import logoRSSimg from '../../../assets/images/rs_school.png';
import { Ivan } from '../../../model/data/memberInfo';
import { MemberObj } from '../../../types/type';

const aboutPage = document.createElement('div');

const teamContainer = document.createElement('div');
teamContainer.classList.add('about__team');

const header = document.createElement('h2');
header.classList.add('team__header');
header.textContent = 'Our team';

teamContainer.append(header);

function createMemberBlock(member: MemberObj) {
  const memberBlock = document.createElement('div');
  memberBlock.classList.add('team__member');
  memberBlock.id = member.name;

  const name = document.createElement('p');
  name.classList.add('member__name');
  name.textContent = `${member.name} ${member.surname}`;

  const role = document.createElement('p');
  role.classList.add('member__role');
  role.textContent = member.role;

  memberBlock.append(name, role);

  const strArr = [
    `${member.name} is a ${member.age.toString()} y.o. ${member.skill} from ${
      member.city
    }`, // add link go maps
  ];

  strArr.forEach((el) => {
    const paragraph = document.createElement('p');
    paragraph.classList.add('member__paragraph');
    paragraph.textContent = el;

    memberBlock.append(paragraph);
  });

  teamContainer.append(memberBlock);
}

createMemberBlock(Ivan);

const rssLink = document.createElement('a');
rssLink.classList.add('about__rss-link');
rssLink.href = 'https://rs.school/js/';

const rssLogo = document.createElement('img');
rssLogo.classList.add('about__rss-img');
rssLogo.alt = 'RSS Logo';
rssLogo.src = logoRSSimg;

rssLink.append(rssLogo);

aboutPage.append(teamContainer, rssLink);

export default aboutPage;
