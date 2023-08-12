import addErrorHandlers from './controller/regFormErrorHanlder';
import './controller/router';
import main from './view/view';
import './controller/regSubmitHandler';

document.body.append(main);
addErrorHandlers();
