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
                    if ( value == ^[0-9]{1,3}$ ){
                        bot.queue({
                        type: "text",
                        text: `${value}cmですね。`
                        });
                    } else {
                        bot.queue({
                        type: "text",
                        text: `${value}cmですね。大きいですね,,,`
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
            address: {
                message_to_confirm: {
                    type: "text",
                    text: "どちらにお届けしましょっ？"
                },
                parser: async (value, bot, event, context) => {
                    if (typeof value == "string"){
                        return value;
                    } else if (typeof value == "object" && value.type == "location"){
                        return value.address;
                    }

                    throw new Error();
                }
            }
        }
    }

    async finish(bot, event, context){
        await bot.reply({
            type: "text",
            text: `あいよっ。じゃあ${context.confirmed.menu}を30分後くらいに${context.confirmed.address}にお届けしますわ。おおきに。`
        });
    }

}