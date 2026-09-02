function main(config) {

    /*
    =====================================
    创建前置出口节点组
    =====================================
    */

    if (!config["proxy-groups"]) {
        config["proxy-groups"] = [];
    }


    /*
    =====================================
    添加独立 provider
    =====================================
    */

    if (!config["proxy-providers"]) {
        config["proxy-providers"] = {};
    }


    config["proxy-providers"]["provider1"] = {

        type: "http",

        url: "https://789.nx.kg/openvpn.php?token=JJmi1vwutFHfssyH8Ym88NQNp2pZQ6Lo",

        interval: 7200,

        path: "./openvpn.yaml",

        override: {
            "dialer-proxy": "🏠 家宽出口"
        }

    };


    /*
    =====================================
    创建 provider 节点管理组
    =====================================
    */

    const providerGroup = {

        name: "🛡 家宽",

        type: "select",

        use: [
            "provider1"
        ]

    };


    /*
    =====================================
    创建前置出口组
    =====================================
    */

    const dialerGroup = {

        name: "🏠 家宽出口",

        type: "url-test",

        url: "https://www.gstatic.com/generate_204",

        interval: 300,

        tolerance: 50,

        proxies: [
            "♻️ 自动选择"
        ]

    };


    /*
    =====================================
    插入到第 4 个分组后面
    =====================================
    */

    const groups = config["proxy-groups"];

    // 找到第 4 个分组：⚖️ 负载均衡
    const index = groups.findIndex(
        group => group && group.name === "⚖️ 负载均衡"
    );

    if (index !== -1) {

        // 🛡 家宽
        groups.splice(index + 1, 0, providerGroup);

        // 🏠 家宽出口紧跟在 🛡 家宽点后面
        groups.splice(index + 2, 0, dialerGroup);

    } else {

        // 如果找不到 ⚖️ 负载均衡，就放到最后
        groups.push(providerGroup);
        groups.push(dialerGroup);

    }


    return config;

}
