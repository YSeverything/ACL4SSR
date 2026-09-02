function main(config) {
    /*
     * ==========================================
     * provider1 独立订阅 + ♻️ 自动选择作为前置
     * ==========================================
     */

    // ------------------------------------------
    // 1. 确保 proxy-providers 存在
    // ------------------------------------------
    if (!config["proxy-providers"]) {
        config["proxy-providers"] = {};
    }

    // ------------------------------------------
    // 2. 添加 provider1
    // ------------------------------------------
    config["proxy-providers"]["provider1"] = {
        type: "http",

        url: "https://789.nx.kg/openvpn.php?token=JJmi1vwutFHfssyH8Ym88NQNp2pZQ6Lo",

        interval: 7200,

        path: "./openvpn.yaml",

        override: {
            "dialer-proxy": "♻️ 自动选择"
        }
    };

    // ------------------------------------------
    // 3. 把 provider1 加入 🚀 节点选择
    // ------------------------------------------
    if (Array.isArray(config["proxy-groups"])) {

        const group = config["proxy-groups"].find(
            g => g && g.name === "🚀 节点选择"
        );

        if (group) {

            if (!Array.isArray(group.use)) {
                group.use = [];
            }

            if (!group.use.includes("provider1")) {
                group.use.push("provider1");
            }
        }
    }

    // ------------------------------------------
    // 4. 返回修改后的配置
    // ------------------------------------------
    return config;
}
