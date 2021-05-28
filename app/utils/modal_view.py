def error_message(block_id, message):
    return {
        "response_action": "errors",
        "errors": {
            block_id: message
        }
    }

def modal_view(trigger_id):
    return {
        "trigger_id": trigger_id,
        "view": {
            "type": "modal",
            "callback_id": "modal-identifier",
            "title": {
            "type": "plain_text",
            "text": "New Post"
            },
            "submit": {
                "type": "plain_text",
                "text": "Submit"
            },
            "blocks": [
                {
                    "type": "divider",
                },
                {
                    "type": "input",
                    "block_id": "url_id",
                    "element": {
                        "type": "plain_text_input",
                        "action_id": "url"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "URL",
                        "emoji": True
                    }
                },
                {
                    "type": "input",
                    "block_id": "post_description_id",
                    "element": {
                        "type": "plain_text_input",
                        "multiline": True,
                        "action_id": "post_description"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Post Description",
                        "emoji": True
                    }
                },
                {
                    "type": "input",
                    "block_id": "tags_id",
                    "element": {
                        "type": "checkboxes",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "Javascript",
                                    "emoji": True
                                },
                                "value": "javascript"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "CSS",
                                    "emoji": True
                                },
                                "value": "css"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "text": "HTML",
                                    "emoji": True
                                },
                                "value": "html"
                            }
                        ],
                        "action_id": "tags"
                    },
                    "label": {
                        "type": "plain_text",
                        "text": "Tags",
                        "emoji": True
                    }
                },
                {
                    "block_id": "user_id",
                    "type": "input",
                    "optional": True,
                    "label": {
                    "type": "plain_text",
                    "text": "Select a channel to post the result on",
                    },
                    "element": {
                    "action_id": "my_action_id",
                    "type": "conversations_select",
                    "response_url_enabled": True,
                    },
                },
            ]
        }
    }