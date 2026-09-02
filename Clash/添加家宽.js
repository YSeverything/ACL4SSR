function main(config) {

    /*
    =====================================
    确保 proxy-groups / proxy-providers 存在
    =====================================
    */

    if (!config["proxy-groups"]) {
        config["proxy-groups"] = [];
    }

    if (!config["proxy-providers"]) {
        config["proxy-providers"] = {};
    }


    /*
    =====================================
    添加独立 provider
    =====================================
    */

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
    获取所有分组
    =====================================
    */

    const groups = config["proxy-groups"];


    /*
    =====================================
    删除旧的 🛡 家宽 / 🏠 家宽出口
    防止脚本重复执行造成重复分组
    =====================================
    */

    for (let i = groups.length - 1; i >= 0; i--) {

        if (
            groups[i] &&
            (
                groups[i].name === "🛡 家宽" ||
                groups[i].name === "🏠 家宽出口"
            )
        ) {

            groups.splice(i, 1);

        }

    }


    /*
    =====================================
    找到 ⚖️ 负载均衡
    =====================================
    */

    const index = groups.findIndex(
        group => group && group.name === "⚖️ 负载均衡"
    );


    /*
    =====================================
    插入两个分组
    =====================================
    */

    if (index !== -1) {

        // 🛡 家宽
        groups.splice(index + 1, 0, providerGroup);

        // 🏠 家宽出口
        groups.splice(index + 2, 0, dialerGroup);

    } else {

        groups.push(providerGroup);
        groups.push(dialerGroup);

    }


    /*
    =====================================
    把 🛡 家宽 和 🏠 家宽出口
    加入 🚀 节点选择
    =====================================
    */

    const mainGroup = groups.find(
        group => group && group.name === "🚀 节点选择"
    );


    if (mainGroup) {

        if (!Array.isArray(mainGroup.proxies)) {
            mainGroup.proxies = [];
        }


        /*
        添加 🛡 家宽
        */

        if (!mainGroup.proxies.includes("🛡 家宽")) {

            mainGroup.proxies.push("🛡 家宽");

        }


        /*
        添加 🏠 家宽出口
        */

        if (!mainGroup.proxies.includes("🏠 家宽出口")) {

            mainGroup.proxies.push("🏠 家宽出口");

        }

    }


    /*
    =====================================
    返回最终配置
    =====================================
    */

    return config;

}
