import createFormBlock from '../../../utils/view/createFormBlock';

const bothDefaultAddressBlock = createFormBlock({
  type: 'checkbox',
  name: `bothDefaultAddress`,
  text: 'Set this address as default shipping & billing',
  required: false,
});

export default bothDefaultAddressBlock;
