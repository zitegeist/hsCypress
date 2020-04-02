import CommonsService from './commerceToolsCommonService.js';
const ProductProjections = () => CommonsService({ entity: 'productProjections', isCacheable: false });

export default ProductProjections;
