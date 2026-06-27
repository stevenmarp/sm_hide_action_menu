from odoo import api, fields, models


class ResUsers(models.Model):
    _inherit = "res.users"

    sm_hide_action_menu_all = fields.Boolean(string="Hide All Action Menu")
    sm_hide_action_menu_model_ids = fields.Many2many(
        "ir.model",
        "sm_hide_action_menu_ir_model_rel",
        "user_id",
        "model_id",
        string="Models with Hidden Action Menu",
    )

    @api.model
    def sm_get_action_menu_rules(self):
        user = self.env.user
        return {
            "hide_all": user.sm_hide_action_menu_all,
            "models": user.sm_hide_action_menu_model_ids.mapped("model"),
        }
