export const getCreditBackgroundColor = (creditType) => {
    switch(creditType) {
        case 0: return '#bb0064';
        case 1: return '#8aa800';
        case 2: return '#008fb7';
        case 3: return '#be4800';
    }
}

export const getCreditImage = (type) => {
    switch (type) {
        case 0: return 'single.jpg';
        case 1: return 'double.jpg';
        case 2: return 'triple.jpg';
        case 3: return 'quad.jpg';
    }
}

export const getGen1TokenThumbnail = (tokens, tokenId) => {
    var token = tokens.find(item => item.tokenId === tokenId);
    return token ? token.imageUrlThumbnail : '';
}

export const isAddressWhitelisted = (addresses, input) => {
    return addresses.indexOf(input) >= 0;
}