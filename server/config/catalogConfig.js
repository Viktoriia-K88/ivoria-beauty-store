import bodyCareConfig from "./categories/bodyCareConfig.js";
import hairCareConfig from "./categories/hairCareConfig.js";
import makeupConfig from "./categories/makeupConfig.js";
import perfumeConfig from "./categories/perfumeConfig.js";
import skincareConfig from "./categories/skincareConfig.js";

export const categoryConfigs = {
  skincare: skincareConfig,
  makeup: makeupConfig,
  perfume: perfumeConfig,
  "hair-care": hairCareConfig,
  "body-care": bodyCareConfig,
};

export const categoryNames = Object.keys(categoryConfigs);

export {
  excludedProductIds,
  excludedProductWords,
  featuredBrands,
  maleProductWords,
  nonBeautyWords,
  typeExcludedProductWords,
} from "./catalogRules.js";
