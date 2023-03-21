const {default: Resolution} = require('@unstoppabledomains/resolution');

const ethereumProviderUrl = "https://eth-mainnet.g.alchemy.com/v2/1lZwN_yIdypSLy8HdLZGqklIPe4xx87M";
const polygonProviderUrl = "https://polygon-mainnet.g.alchemy.com/v2/tWfzgDK4rYavJBX5syU_uOrlfraPJUCF";
var name;

// custom provider config using the Resolution constructor options
export const resolution = new Resolution({
    sourceConfig: {
      uns: {
        locations: {
          Layer1: {
            url: ethereumProviderUrl,
            network: 'mainnet'
          },
          Layer2: {
            url: polygonProviderUrl,
            network: 'polygon-mainnet',
          },
        },
      },
    },
});
