{
    "name": "Hide Action Menu",
    "version": "19.0.1.0.0",
    "category": "Extra Tools",
    "summary": "Hide the Action menu per user or per model",
    "description": """
Hide Action Menu
================

Control whether the Action menu appears for selected users. Administrators can hide
all Action menu entries or apply the rule only to specific Odoo models.
    """,
    "author": "Steven Marp",
    "website": "https://apps.odoo.com/apps/modules/browse?author=Steven Marp",
    "license": "OPL-1",
    "depends": ["base", "web"],
    "data": [
        "views/res_users_views.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "sm_hide_action_menu/static/src/js/hide_action_menu.js",
        ],
    },
    "images": ["static/description/img/banner.gif"],
    "installable": True,
    "application": True,
    "auto_install": False,
    "price": 5.12,
    "currency": "USD",
}
