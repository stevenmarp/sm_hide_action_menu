/** @odoo-module **/

import { FormController } from "@web/views/form/form_controller";
import { ListController } from "@web/views/list/list_controller";
import { onWillStart } from "@odoo/owl";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";

function setupActionMenuRules(controller) {
    controller.smHideActionMenuRules = { hideAll: false, models: [] };
    controller.orm = useService("orm");
    onWillStart(async () => {
        const result = await controller.orm.call("res.users", "sm_get_action_menu_rules", []);
        controller.smHideActionMenuRules = {
            hideAll: Boolean(result.hide_all),
            models: result.models || [],
        };
    });
}

function shouldHideActionMenu(controller) {
    const rules = controller.smHideActionMenuRules || {};
    return Boolean(rules.hideAll || (rules.models || []).includes(controller.props.resModel));
}

function hideActionMenuItems(items) {
    if (!items) {
        return items;
    }
    return {
        ...items,
        action: [],
    };
}

patch(ListController.prototype, {
    setup() {
        super.setup();
        setupActionMenuRules(this);
    },

    get actionMenuItems() {
        const items = super.actionMenuItems;
        return shouldHideActionMenu(this) ? hideActionMenuItems(items) : items;
    },
});

patch(FormController.prototype, {
    setup() {
        super.setup();
        setupActionMenuRules(this);
    },

    get actionMenuItems() {
        const items = super.actionMenuItems;
        return shouldHideActionMenu(this) ? hideActionMenuItems(items) : items;
    },
});
