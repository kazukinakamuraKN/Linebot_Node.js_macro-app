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
                            return "男"
                        } else {
                            return "女"
                        }
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `${value}性ですね。`
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
                            return "低い"
                        } else if (["まあまあ"].includes(value)) {
                            return "まあまあ"
                        }else {
                            return "かなり高い"
                        }
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `${value}ですね。`
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
                            return "減量"
                        } else if (["維持"].includes(value)) {
                            return "維持"
                        }else {
                            return "増量"
                        }
                    }

                    throw new Error();
                },
                reaction: async (error, value, bot, event, context) => {
                    if (error) return;

                    bot.queue({
                        type: "text",
                        text: `${value}ですね。`
                    });
                }
            }
        }
    }

    async finish(bot, event, context){
        await bot.reply({
            type: "text",
            text: `あなたの基礎代謝は${10 * context.confirmed.menuWeight + 6.25 * context.confirmed.menuHeight -5 * context.confirmed.menuAge + 5 }を30分後くらいに${context.confirmed.menuPurpose.message_to_confirm}にお届けしますわ。おおきに。`
        });
    }

}