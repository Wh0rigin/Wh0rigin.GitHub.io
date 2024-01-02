const getAssets = function(path:string): string {
    return new URL(path, import.meta.url).href;
};

export default getAssets;