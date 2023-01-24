const AppConfig = {
    host: 'https://ic0.app',
    environment: 'production-testing', // development, production-testing, production
    eventCanisterId: 'gpzar-piaaa-aaaal-abujq-cai',
    whitelistedForTest: [
        '14f8baa65eb528bf5290d7618a05fe83b4da4ac4e7496d829f20d34d69167e3e',
        '74e470c0cd4bd98d9e3a3f163719ef83e15f48d14ee91546f846a3f9f9ae0d04',
        '865ba3d34c0e0c0807755032f24763260f101faf59684b92f60932afad4db62c',
        '60d61c832602d309ee6849dbdfcccf65b4fc99dfa8863080b47d13cfe21247ff',
        '31c9c22db1e1eec9e1534f2dea360c3b666d4a9c183319b2a319743bcb6d1810',
        'c753c814b4dd329181f2ad1d13569949f9c95d74d8db1225d2324253f0cb72e5',
        '11806b260a4fb20d968bd555d927e524cfd09d9e573c02e6462bb55218c3a771',
        '26219409c2635d9bc99d8cbb0e302f7fe022af9e1469fe382b1c3fb6b919b1ac',
        'ea709408fe40da893b8a1376966065e586b7a01019cf2ae1fbc23988178ef0ad',
        '1eceb055350ba43d165668191df2e74ca0caf6bae66197034fb5aca826170b4c',
        '41d3c96b44cb97a965d6265ea881db83139e9d6d2be626a1db4c5ffa0100b7d8',
        'f4be702b54a8e380b9cee47e4a22bf27d0b722ef796bd9a7438c1b9d2709680b'
    ]
};

export const getAllCanistersToWhitelist = () => {
    return [
        AppConfig.eventCanisterId,
    ];
}

export default AppConfig;