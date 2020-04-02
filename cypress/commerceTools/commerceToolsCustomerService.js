import CommonsService from './commerceToolsCommonService.js';
const Customers = () => CommonsService({ entity: 'customers', isCacheable: false });
export default Customers;
