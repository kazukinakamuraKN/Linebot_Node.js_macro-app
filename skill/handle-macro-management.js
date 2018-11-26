"use strict";

module.exports = class SkillHandleDeliveryOrder {

    constructor(){
        this.required_parameter = {
            menuGender: {
                message_to_confirm: {
                    type: "template",
                    altText: "マクロ管理法スタート",
                    template: {
                        type: "buttons",
                        text: "まずは性別を教えてください",
                        actions: [
                            {type: "message", label: "男", text: "男"},
                            {type: "message", label: "女", text: "女"}
                        ]
                    }
                },
                parser: async (value, bot, event, context) => {
                    if (["男", "女"].includes(value)) {
                        if (["男"].includes(value)){
                            var ary = ["男",5]
                            return ary
                        } else {
                            var ary = ["女",-161]
                            return ary
                        }
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `${value[0]}性ですね。`
                    });
                }
            },
            menuHeight: {
                message_to_confirm: {
                    type: "text",
                    text: "身長を教えてください(数値)"
                },
                parser: async (value, bot, event, context) => {
                    value = Number(value);
                    if (typeof value == "number"){
                        return value;
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;
                    if ( !isNaN(value) ){
                        bot.queue({
                        type: "text",
                        text: `${value}cmですね。`
                        });
                    } else {
                        bot.queue({
                        type: "text",
                        text: `${value}cmですね。文字列ですね,,,`
                        });
                    }
                    
                }
            },
            menuWeight: {
                message_to_confirm: {
                    type: "text",
                    text: "体重を教えてください(数値)"
                },
                parser: async (value, bot, event, context) => {
                    value = Number(value);
                    if (typeof value == "number"){
                        return value;
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `${value}kgですね。`
                    });
                }
            },
            menuAge: {
                message_to_confirm: {
                    type: "text",
                    text: "年齢を教えてください(数値)"
                },
                parser: async (value, bot, event, context) => {
                    value = Number(value);
                    if (typeof value == "number"){
                        return value;
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `${value}歳ですね。`
                    });
                }
            },
            menuActive: {
                message_to_confirm: {
                    type: "template",
                    altText: "アクティブ度を選択",
                    template: {
                        type: "buttons",
                        text: "アクティブ度を教えてください",
                        actions: [
                            {type: "message", label: "低い", text: "低い"},
                            {type: "message", label: "まあまあ", text: "まあまあ"},
                            {type: "message", label: "かなり高い", text: "かなり高い"}
                        ]
                    }
                },
                parser: async (value, bot, event, context) => {
                    if (["低い", "まあまあ", "かなり高い"].includes(value)) {
                        if (["低い"].includes(value)){
                            var ary = ["低い",1.2]
                            return ary
                        } else if (["まあまあ"].includes(value)) {
                            var ary = ["まあまあ",1.55]
                            return ary
                        }else {
                            var ary = ["かなり高い",1.725]
                            return ary
                        }
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `${value[0]}ですね。`
                    });
                }
            },
            menuPurpose: {
                message_to_confirm: {
                    type: "template",
                    altText: "目的を選択",
                    template: {
                        type: "buttons",
                        text: "目的を教えてください",
                        actions: [
                            {type: "message", label: "減量", text: "減量"},
                            {type: "message", label: "維持", text: "維持"},
                            {type: "message", label: "増量", text: "増量"}
                        ]
                    }
                },
                parser: async (value, bot, event, context) => {
                    if (["減量", "維持", "増量"].includes(value)) {
                        if (["減量"].includes(value)){
                            var ary = ["減量",0.8]
                            return ary
                        } else if (["維持"].includes(value)) {
                            var ary = ["維持",1]
                            return ary
                        }else {
                            var ary = ["増量",1.2]
                            return ary
                        }
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `${value[0]}ですね。`
                    });
                }
            }
        }
    }

    async finish(bot, event, context){
        await bot.reply({
            type: "text",
            text: `あなたの基礎代謝は${Math.round(10 * context.confirmed.menuWeight + 6.25 * context.confirmed.menuHeight -5 * context.confirmed.menuAge + context.confirmed.menuGender[1] )}kcalです。\nあなたの目的とアクティブ度から計算された摂取カロリーは${Math.round((10 * context.confirmed.menuWeight + 6.25 * context.confirmed.menuHeight -5 * context.confirmed.menuAge + context.confirmed.menuGender[1]) * context.confirmed.menuActive[1] * context.confirmed.menuPurpose[1]) }kcalです。また、マクロバランスは\nタンパク質${context.confirmed.menuWeight * 2}g\n脂質${Math.round(((10 * context.confirmed.menuWeight + 6.25 * context.confirmed.menuHeight -5 * context.confirmed.menuAge + context.confirmed.menuGender[1]) * context.confirmed.menuActive[1] * context.confirmed.menuPurpose[1]) * 0.25 / 9)}g\n炭水化物${Math.round(((10 * context.confirmed.menuWeight + 6.25 * context.confirmed.menuHeight -5 * context.confirmed.menuAge + context.confirmed.menuGender[1]) * context.confirmed.menuActive[1] * context.confirmed.menuPurpose[1]) - (context.confirmed.menuWeight * 2) - (((10 * context.confirmed.menuWeight + 6.25 * context.confirmed.menuHeight -5 * context.confirmed.menuAge + context.confirmed.menuGender[1]) * context.confirmed.menuActive[1] * context.confirmed.menuPurpose[1]) * 0.25) / 4)}g\n`
        });
    }

}