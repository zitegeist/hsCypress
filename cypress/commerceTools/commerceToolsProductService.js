import CommonsService from './commerceToolsCommonService.js';
const Products = () => CommonsService({ entity: 'products', isCacheable: false });

export default Products;
