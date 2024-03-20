const { EmbedBuilder } = require("discord.js");
const { divine } = require("../controller/currencyExchange");
const searchJsonReady = require("./divinePrice.json");

module.exports.getEmbedFromExchange = async function getEmbedFromExchange() {
    const exchange = await divine(searchJsonReady);

    const { finalDivinePrice, searchURL, leagueName } = exchange;

    // test data avoid rate limit
    // const exchange = [[1041,950,950,920,920,910,901,900,861,850],'nb3aQvH0'];

    const formatExchange = finalDivinePrice
        .map((divinePrice) => divinePrice + "c")
        .toString();

    return new EmbedBuilder()
        .setAuthor({
            name: "目前POE台服價格",
        })
        .setColor("#ffbe0a")
        .setTitle("官網連結")
        .setURL(`https://pathofexile.tw/trade/exchange/${leagueName}/${searchURL}`)
        .setDescription(
            `目前1D換C的價格，取官網前${finalDivinePrice.length}筆\n每 4 分鐘將會定時送出訊息至特定頻道`
        )
        .addFields(
            {
                name: "目前版本、聯盟",
                value: "3.21 版  熔火冥獄",
                inline: true,
            },
            {
                name: "使用方法",
                value:
                    "</help:1112299719394340897>查看說明\n</price:1112209071601365124>或 `!d` 查看價格",
                inline: true,
            },
            { name: `第 1 ~ ${finalDivinePrice.length} 筆`, value: formatExchange },
            { name: "換算成c:", value: "取第二筆為基準作換算，小數點無條件捨去" },
            {
                name: "\u200b",
                value: ` 0.1D = ${Math.trunc(finalDivinePrice[1] * 0.1).toString() + "c"
                    }
                        \n0.2D = ${Math.trunc(finalDivinePrice[1] * 0.2).toString() + "c"
                    }
                        \n0.3D = ${Math.trunc(finalDivinePrice[1] * 0.3).toString() + "c"
                    }
                        \n0.4D = ${Math.trunc(finalDivinePrice[1] * 0.4).toString() + "c"
                    } 
                        \n0.5D = ${Math.trunc(finalDivinePrice[1] * 0.5).toString() + "c"
                    }`,
                inline: true,
            },
            {
                name: "\u200b",
                value: `0.6D = ${Math.trunc(finalDivinePrice[1] * 0.6).toString() + "c"}
                        \n0.7D = ${Math.trunc(finalDivinePrice[1] * 0.7).toString() + "c"
                    }
                        \n0.8D = ${Math.trunc(finalDivinePrice[1] * 0.8).toString() + "c"
                    }
                        \n0.9D = ${Math.trunc(finalDivinePrice[1] * 0.9).toString() + "c"
                    }`,
                inline: true,
            }
        )
        .setFooter({
            text: "資料取得時間",
        })
        .setTimestamp();
};
