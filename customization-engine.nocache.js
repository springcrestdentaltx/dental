/*! createdTime: Fri Aug 02 2024 09:17:51 GMT+0000 (Coordinated Universal Time) */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 697:
/***/ (function() {


;// CONCATENATED MODULE: ../src/ts/what/fetcher/Fetcher.ts
var Fetcher = (function () {
    function Fetcher() {
    }
    return Fetcher;
}());


;// CONCATENATED MODULE: ../src/ts/what/fetcher/LocalStorageFetcher.ts
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var LocalStorageFetcher = (function (_super) {
    __extends(LocalStorageFetcher, _super);
    function LocalStorageFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalStorageFetcher.prototype.getType = function () {
        return "local_storage";
    };
    LocalStorageFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        return RuleEngine_$wnd.localStorage.getItem(rule.op1);
    };
    return LocalStorageFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/processor/Processor.ts
var Processor = (function () {
    function Processor() {
    }
    return Processor;
}());


;// CONCATENATED MODULE: ../src/ts/what/processor/StringProcessor.ts
var StringProcessor_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var StringProcessor = (function (_super) {
    StringProcessor_extends(StringProcessor, _super);
    function StringProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringProcessor.prototype.getType = function () {
        return "string_operation";
    };
    StringProcessor.prototype.doProcess = function (rule, previousResult) {
        Console.debug(rule.rule_type, "Performing process for payload: ", rule);
        if (rule.operator == 'toString') {
            return previousResult.toString();
        }
        else if (rule.operator === 'concatenate') {
            var firstString = rule.op1 === 'custom_string' ? rule.op3 : WhatFactory_WHAT_REUSE_MAP.get(rule.op1);
            var secondString = rule.op2 === 'custom_string' ? rule.op4 : WhatFactory_WHAT_REUSE_MAP.get(rule.op2);
            return firstString + secondString;
        }
        if (typeof previousResult !== 'string')
            return null;
        switch (rule.operator) {
            case "uppercase":
                return previousResult.toUpperCase();
            case "lowercase":
                {
                    var stringToConvert = WhatFactory_WHAT_REUSE_MAP.get(rule.op1);
                    return stringToConvert.toLowerCase();
                }
            case "replace":
                {
                    var params = rule.op1.split(",");
                    return previousResult.replace(params[0], params[1]);
                }
            case "substring":
                {
                    var op1 = WhatFactory_WHAT_REUSE_MAP.get(rule.op1);
                    var startIndex = rule.op2;
                    var endIndex = rule.op3;
                    return op1.substring(parseInt(startIndex), parseInt(endIndex) + 1);
                }
            case "length":
                return previousResult.length;
            case "trim":
                {
                    var stringToConvert = WhatFactory_WHAT_REUSE_MAP.get(rule.op1);
                    return stringToConvert.trim();
                }
            case "charAt":
                return previousResult.charAt(parseInt(rule.op1));
            case "split":
                {
                    var op1 = WhatFactory_WHAT_REUSE_MAP.get(rule.op1);
                    var tokens = op1.split(rule.op2);
                    return tokens[parseInt(rule.op3)];
                }
        }
        return null;
    };
    return StringProcessor;
}(Processor));


;// CONCATENATED MODULE: ../src/ts/what/fetcher/FunctionFetcher.ts
var FunctionFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var FunctionFetcher = (function (_super) {
    FunctionFetcher_extends(FunctionFetcher, _super);
    function FunctionFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionFetcher.prototype.getType = function () {
        return "function";
    };
    FunctionFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        var op1 = rule.op1;
        var params = op1.split(".");
        var funcName = params[params.length - 1];
        var namespace = op1.replace(funcName, "");
        namespace = namespace.length > 0 ? namespace.substring(0, namespace.length - 1) : namespace;
        var context = namespace.length > 0 ? readFromWindow(namespace) : RuleEngine_$wnd;
        return context && context[funcName] ? context[funcName]() : null;
    };
    return FunctionFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/fetcher/SessionStorageFetcher.ts
var SessionStorageFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SessionStorageFetcher = (function (_super) {
    SessionStorageFetcher_extends(SessionStorageFetcher, _super);
    function SessionStorageFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SessionStorageFetcher.prototype.getType = function () {
        return "session_storage";
    };
    SessionStorageFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        return RuleEngine_$wnd.sessionStorage.getItem(rule.op1);
    };
    return SessionStorageFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/common/NativeOverride.ts
var WfxMap = Map;
try {
    if (window._wfx_get_native_function && window._wfx_get_native_function instanceof Function) {
        if (typeof (window._wfx_get_native_function("Map", Map)) === "function") {
            if (WfxMap !== window._wfx_get_native_function("Map", Map)) {
                WfxMap = window._wfx_get_native_function("Map", Map);
            }
        }
    }
}
catch (e) { }


;// CONCATENATED MODULE: ../src/ts/common/global.ts

var PageTagsStore = (function () {
    function PageTagsStore() {
        this.page_tags = [];
    }
    PageTagsStore.prototype.initialise = function (newPageTags) {
        this.page_tags = newPageTags;
    };
    PageTagsStore.prototype.getPageTags = function () {
        return this.page_tags;
    };
    return PageTagsStore;
}());
var pageTagStore = new PageTagsStore();
var $whatfix_custom_events = new WfxMap();


;// CONCATENATED MODULE: ../src/ts/what/fetcher/WindowVariableFetcher.ts
var WindowVariableFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var WindowVariableFetcher = (function (_super) {
    WindowVariableFetcher_extends(WindowVariableFetcher, _super);
    function WindowVariableFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowVariableFetcher.prototype.getType = function () {
        return "variable";
    };
    WindowVariableFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        var winVar = readFromWindow(rule.op1);
        return winVar != null && winVar != undefined ? winVar : "";
    };
    return WindowVariableFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/processor/JsonProcessor.ts
var JsonProcessor_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var JsonProcessor = (function (_super) {
    JsonProcessor_extends(JsonProcessor, _super);
    function JsonProcessor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonProcessor.prototype.getType = function () {
        return "json_operation";
    };
    JsonProcessor.prototype.doProcess = function (rule, previousResult) {
        Console.debug(rule.rule_type, "Performing process for payload: ", rule);
        switch (rule.operator) {
            case "read_key":
                var object = void 0;
                try {
                    object = typeof WhatFactory_WHAT_REUSE_MAP.get(rule.op1) === 'object'
                        ? WhatFactory_WHAT_REUSE_MAP.get(rule.op1)
                        : JSON.parse(WhatFactory_WHAT_REUSE_MAP.get(rule.op1));
                }
                catch (e) {
                    Console.debug(rule.rule_type, "Invalid JSON passed to the processor");
                    return null;
                }
                if (typeof object === 'object') {
                    return readFromJSON(object, rule.op2);
                }
                return null;
            case "modify_key":
            case "add_key":
                {
                    (typeof previousResult === 'object') ? previousResult[rule.op1] = rule.op2 : null;
                    return previousResult;
                }
            case "remove_key":
                {
                    (typeof previousResult === 'object') ? (previousResult[rule.op1] ? delete previousResult[rule.op1] : null) : null;
                    return previousResult;
                }
        }
        return null;
    };
    return JsonProcessor;
}(Processor));


;// CONCATENATED MODULE: ../src/ts/what/action/Action.ts
var Action = (function () {
    function Action() {
    }
    return Action;
}());


;// CONCATENATED MODULE: ../src/ts/what/action/WfxSetUserAction.ts
var WfxSetUserAction_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var WfxSetUserAction = (function (_super) {
    WfxSetUserAction_extends(WfxSetUserAction, _super);
    function WfxSetUserAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WfxSetUserAction.prototype.getType = function () {
        return "set_user";
    };
    WfxSetUserAction.prototype.performAction = function (rule, what, processorResult) {
        Console.debug(rule.rule_type, "performing action for payload: ", rule);
        persistUserID(what, processorResult);
    };
    return WfxSetUserAction;
}(Action));


;// CONCATENATED MODULE: ../src/ts/common/Constants.ts

var Operators;
(function (Operators) {
    Operators["EQUALS"] = "=";
    Operators["NOT_EQUALS"] = "!=";
    Operators["CONTAINS"] = "~";
    Operators["DOES_NOT_CONTAIN"] = "~!";
    Operators["STARTS_WITH"] = "startsWith";
    Operators["ENDS_WITH"] = "endsWith";
    Operators["EXISTS"] = "exists";
    Operators["NOT_EXISTS"] = "!exists";
    Operators["REGEX"] = "regex";
    Operators["COMPARE"] = "compare";
    Operators["BELONG_TO"] = "belong_to";
    Operators["DO_NOT_BELONG_TO"] = "do_not_belong_to";
    Operators["IS_BLANK"] = "blank";
    Operators["IS_NOT_BLANK"] = "notBlank";
})(Operators || (Operators = {}));
var DateOperator;
(function (DateOperator) {
    DateOperator["ON"] = "on";
    DateOperator["BEFORE"] = "before";
    DateOperator["AFTER"] = "after";
    DateOperator["BETWEEN"] = "between";
    DateOperator["DATE_GREATER_THAN"] = "dateGreaterThan";
    DateOperator["DATE_LESS_THAN"] = "dateLessThan";
})(DateOperator || (DateOperator = {}));
var NumberOperator;
(function (NumberOperator) {
    NumberOperator["EQUALS"] = "=";
    NumberOperator["NOT_EQUALS"] = "!=";
    NumberOperator["GREATER_THAN"] = "greaterThan";
    NumberOperator["LESS_THAN"] = "lessThan";
    NumberOperator["BETWEEN"] = "between";
})(NumberOperator || (NumberOperator = {}));
var OperationType;
(function (OperationType) {
    OperationType["TEXT"] = "text";
    OperationType["DATE"] = "date";
    OperationType["NUMBER"] = "number";
})(OperationType || (OperationType = {}));
var DateConstants;
(function (DateConstants) {
    DateConstants["TIMEZONE_ABSOLUTE"] = "absolute";
})(DateConstants || (DateConstants = {}));
var WHATFIX_EVENT = "whatfix_callback";
var CUSTOM_EVENT = "custom_event";
var WHERE = "where";
var WHEN = "when";
var WHAT = "what";
var REUSE_KEY_NAME = "output_of_sequence_";
var WHEN_KEY_PREFIX = "when_";
var WHAT_KEY_PREFIX = "what_";
var ID_SUFFIX = "_id";
var Constants_USER_ID_KEY_IN_LOCAL_STORAGE = "wfx_rule_user";
var LOCALE_KEY_IN_LOCAL_STORAGE = "wfx_rule_locale";
var Constants_USER_NAME_KEY_IN_LOCAL_STORAGE = "wfx_user_name_for_rule_engine";
var FETCHER_NOT_FOUND = "fetcher_not_found";
var INVALID_WHAT_BLOCK = "invalid_what_block";
var INVALID_PROCESSOR_RESULT = "invalid_processor_result";
var RULE_SUCCESS = "rule_successful";
var SET_USER = "set_user";
var CUSTOMIZATION_SCRIPT_QUERY = "customization_script_query";
var CUSTOMIZATION_SCRIPT_QUERY_RESULT = "customization_script_query_result";
var FETCHER_RESULT_EMPTY = "fetcher_result_empty";
var CUSTOM_EVENTS = {
    FLOW: {
        SCROLL: "scroll",
        ON_BEFORE_START: "onBeforeStart",
        ON_START: "onStart",
        ON_BEFORE_SHOW: "onBeforeShow",
        ON_MISS: "onMiss",
        ON_BEFORE_TIP_SHOW: "onBeforeTipShow",
        ON_SHOW: "onShow",
        ON_AFTER_SHOW: "onAfterShow",
        ON_STEP_COMPLETE: "onStepComplete",
        ON_NEXT: "onNext",
        ON_CLOSE: "onClose"
    },
    END_MESSAGE: {
        ON_BEFORE_END: "onBeforeEnd",
        ON_END: "onEnd",
        ON_AFTER_FLOW_END: "onAfterFlowEnd",
    },
    AUTO_FLOW_TIPS: {
        EXECUTE_WITH_CALLBACK: "executeWithCallback"
    },
    USER_ACTION: {
        ON_GA_SET_ACCOUNT: "onGASetAccount",
        ON_USER_ACTION_COMPLETION: "onUserActionCompletion"
    },
    SELF_HELP: {
        ON_BEFORE_WIDGET_SHOW: "onBeforeWidgetShow",
        ON_LAUNCHER_DRAG: "onLauncherDrag",
        OPEN_LINK_IN_POPUP: "openLinkInPopup"
    },
    POPUP: {
        GET_POPUP_TIMESTAMP: "getPopupTimestamp",
        GET_POPUP_VIEW_COUNT: "getPopupViewCount",
        ON_BEFORE_POPUP_SHOW: "onBeforePopUpShow",
        ON_POPUP_CLOSE: "onPopupClose",
        ON_POPUP_SKIP: "onPopupSkip",
        ON_POPUP_SUCCESS: "onPopupSuccess",
        ON_POPUP_VIEW: "onPopupView",
        ON_DONT_SHOW_POPUP: "onDontShowPopup",
    },
    TIP: {
        ON_STATIC_CLOSE: "onStaticClose",
        ON_STATIC_SHOW: "onStaticShow"
    },
    FINDER_SC: {
        ON_BEFORE_GET_PAGE_OPTIONS: "onBeforeGetPageOptions",
        ON_PAGE_CHANGE: "onPageChange"
    },
    TASK_LIST: {
        COMPLETED_TASKS: "completedTasks",
        GET_TASKLIST_NUDGE_COUNTERS: "getTasklistNudgeCounters",
        ON_BEFORE_TASKLIST_SHOW: "onBeforeTaskListShow",
        ON_EACH_TASK_COMPLETED: "onEachTaskCompleted",
        ON_EACH_TASKER_SEGMENT_COMPLETE: "onEachTaskerSegmentCompleted",
        ON_TASKS_COMPLETED: "onTasksCompleted",
        REMAINING_TASKS_COUNT: "remainingTasksCount",
        UPDATE_TASKLIST_NUDGE_COUNTERS: "updateTasklistNudgeCounters",
    },
    SURVEY: {
        ON_BEFORE_SURVEY_SHOW: "onBeforeSurveyShow",
        ON_SURVEY_SHOW: "onSurveyShow",
        ON_SURVEY_SUBMIT: "onSurveySubmit",
        ON_SURVEY_CLOSE: "onSurveyClose",
    },
    BEACON: {
        ON_BEACON_SEEN: "onBeaconSeen",
    }
};
var SegmentType;
(function (SegmentType) {
    SegmentType["BEACON"] = "Beacon";
    SegmentType["LAUNCHER"] = "Launcher";
    SegmentType["POPUP"] = "Pop-up";
    SegmentType["SELF_HELP"] = "Self Help";
    SegmentType["SMART_TIP"] = "Smart-tip";
    SegmentType["SURVEY"] = "Survey";
    SegmentType["TASK_LIST"] = "Task list";
})(SegmentType || (SegmentType = {}));
var LogCategory;
(function (LogCategory) {
    LogCategory["COMMON"] = "common";
    LogCategory["LOCALE_RULE"] = "locale_rule";
    LogCategory["USER_IDENTIFICATION_RULE"] = "user_identification_rule";
    LogCategory["VISIBILITY_RULE"] = "visibility_rule";
})(LogCategory || (LogCategory = {}));
var LogCategorySize = new WfxMap([
    [LogCategory.COMMON, 300],
    [LogCategory.LOCALE_RULE, 300],
    [LogCategory.USER_IDENTIFICATION_RULE, 300],
    [LogCategory.VISIBILITY_RULE, 1000]
]);
var LogCategoryDefaultSize = 300;
var WFX_SEGMENT_EVAL_RESULT = "wfx_segment_eval_result";
var VARIABLE_PREFIX = "var-";
var AppSpecificRuleObject = {
    WORKDAY_DATA: "workday_data"
};
var WORKDAY_DATA_LOCAL_STORAGE_KEY = "_wfx_workday_user_data";
var AppSpecificEvaluationValid = new Set([AppSpecificRuleObject.WORKDAY_DATA]);

;// CONCATENATED MODULE: ../src/ts/common/PromiseUtility.ts
var cancellablePromise = function (promise, timeOutValue) {
    var newPromise = new Promise(function (res, rej) {
        promise
            .then(res)
            .catch(rej);
    });
    var promiseTimeOut;
    newPromise.cancel = function () { };
    newPromise.isPending = true;
    if (timeOutValue) {
        promiseTimeOut = setTimeout(function () {
            newPromise.cancel();
        }, timeOutValue);
    }
    var clearInterval = function () { return timeOutValue && promiseTimeOut && (promiseTimeOut === null || promiseTimeOut === void 0 ? void 0 : promiseTimeOut.clearInterval) && promiseTimeOut.clearInterval(); };
    newPromise.then(function () {
        newPromise.isPending = false;
        clearInterval();
    }).catch(function () {
        newPromise.isPending = false;
        clearInterval();
    });
    return newPromise;
};
var anyPromise = function (promisesArray) {
    var promiseErrors = new Array(promisesArray.length);
    var counter = 0;
    return new Promise(function (resolve, reject) {
        promisesArray.forEach(function (promise, index) {
            Promise.resolve(promise)
                .then(function (data) {
                resolve(data);
            })
                .catch(function (error) {
                promiseErrors[index] = error;
                counter = counter + 1;
                if (counter === promisesArray.length) {
                    reject(promiseErrors);
                }
            });
        });
    });
};
var allPromise = function (promises) {
    return new Promise(function (resolve, reject) {
        if (!Array.isArray(promises)) {
            return reject(new TypeError('arguments must be an array'));
        }
        var resolvedCounter = 0;
        var resolvedValues = new Array(promises.length);
        promises.forEach(function (promise, index) {
            Promise.resolve(promise).then(function (value) {
                resolvedCounter++;
                resolvedValues[index] = value;
                if (resolvedCounter === promises.length) {
                    resolve(resolvedValues);
                }
            }).catch(function (reason) {
                reject(reason);
            });
        });
        if (promises.length === 0) {
            resolve([]);
        }
    });
};

;// CONCATENATED MODULE: ../src/ts/common/DateUtility.ts
var DATE_FORMAT_MAP = {
    'dd/MM/yyyy': {
        regex: /(\d{2})\/(\d{2})\/(\d{4})/,
        day: 0,
        month: 1,
        year: 2,
        getMonthFromName: false
    },
    'MM/dd/yyyy': {
        regex: /(\d{2})\/(\d{2})\/(\d{4})/,
        day: 1,
        month: 0,
        year: 2,
        getMonthFromName: false
    },
    'yyyy/MM/dd': {
        regex: /(\d{4})\/(\d{2})\/(\d{2})/,
        day: 2,
        month: 1,
        year: 0,
        getMonthFromName: false
    },
    'yyyy/dd/MM': {
        regex: /(\d{4})\/(\d{2})\/(\d{2})/,
        day: 1,
        month: 2,
        year: 0,
        getMonthFromName: false
    },
    'dd MMMM yyyy': {
        regex: /(\d{2}) (\w+) (\d{4})/,
        day: 0,
        month: 1,
        year: 2,
        getMonthFromName: true,
    },
    'MMMM dd yyyy': {
        regex: /(\w+) (\d{2}) (\d{4})/,
        day: 1,
        month: 0,
        year: 2,
        getMonthFromName: true
    }
};
var MONTH_MAP = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
};

;// CONCATENATED MODULE: ../src/ts/common/RulesObjects.ts
var ConditionType;
(function (ConditionType) {
    ConditionType["WHERE"] = "where";
    ConditionType["WHO"] = "who";
    ConditionType["WHEN_END"] = "when_end";
    ConditionType["WHEN_START"] = "when_start";
})(ConditionType || (ConditionType = {}));

;// CONCATENATED MODULE: ../src/ts/strategy/BooleanStrategy.ts

var BooleanStrategy = (function () {
    function BooleanStrategy() {
    }
    BooleanStrategy.prototype.isFit = function (rule, data) {
        var left = this.getLeft(rule, data);
        var right = this.getRight(rule);
        return this.compare(rule, left, right);
    };
    BooleanStrategy.prototype.getRight = function (rule) {
        return rule.op1;
    };
    BooleanStrategy.prototype.exists = function (leftValue, _rightValue) {
        return leftValue != undefined && leftValue != null && leftValue;
    };
    BooleanStrategy.prototype.compare = function (rule, o1, o2) {
        switch (rule.operator) {
            case Operators.EXISTS:
            case Operators.BELONG_TO:
                return this.exists(o1, o2);
            case Operators.NOT_EXISTS:
            case Operators.DO_NOT_BELONG_TO:
                return !this.exists(o1, o2);
            case Operators.EQUALS:
                return o1 == o2;
            case Operators.NOT_EQUALS:
                return o1 != o2;
            case Operators.CONTAINS:
                return o1.indexOf(o2) != -1;
            case Operators.DOES_NOT_CONTAIN:
                return o1.indexOf(o2) == -1;
            case Operators.STARTS_WITH:
                return o1.startsWith(o2);
            case Operators.ENDS_WITH:
                return o1.endsWith(o2);
        }
        return false;
    };
    return BooleanStrategy;
}());


;// CONCATENATED MODULE: ../src/ts/strategy/WindowVariableStrategy.ts
var WindowVariableStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var WindowVariableStrategy = (function (_super) {
    WindowVariableStrategy_extends(WindowVariableStrategy, _super);
    function WindowVariableStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WindowVariableStrategy.prototype.getType = function () {
        return "variable";
    };
    WindowVariableStrategy.prototype.getLeft = function (rule) {
        var winVar = readFromWindow(rule.op1);
        return winVar != null && winVar != undefined ? winVar : null;
    };
    WindowVariableStrategy.prototype.getRight = function (rule) {
        return rule.op2;
    };
    return WindowVariableStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/ElementStrategy.ts
var ElementStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ElementStrategy = (function (_super) {
    ElementStrategy_extends(ElementStrategy, _super);
    function ElementStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementStrategy.prototype.getLeft = function (rule) {
        var elementHandler = new ElementHandler();
        return elementHandler.findFinalElement(JSON.parse(rule.element_meta));
    };
    ElementStrategy.prototype.getType = function () {
        return "element";
    };
    ElementStrategy.prototype.isFit = function (rule) {
        var element = this.getLeft(rule);
        return this.compare(rule, element, null);
    };
    ElementStrategy.prototype.exists = function (leftValue, _rightValue) {
        return leftValue != null && leftValue != undefined;
    };
    return ElementStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/LocalStorageStrategy.ts
var LocalStorageStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var LocalStorageStrategy = (function (_super) {
    LocalStorageStrategy_extends(LocalStorageStrategy, _super);
    function LocalStorageStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalStorageStrategy.prototype.getType = function () {
        return "local_storage";
    };
    LocalStorageStrategy.prototype.getLeft = function (rule) {
        return getLocalStorageValue(rule.op1);
    };
    LocalStorageStrategy.prototype.getRight = function (rule) {
        return rule.op2;
    };
    return LocalStorageStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/CookieStrategy.ts
var CookieStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var CookieStrategy = (function (_super) {
    CookieStrategy_extends(CookieStrategy, _super);
    function CookieStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CookieStrategy.prototype.getType = function () {
        return "cookie";
    };
    CookieStrategy.prototype.getLeft = function (rule) {
        return getCookieValue(rule.op1);
    };
    CookieStrategy.prototype.getRight = function (rule) {
        return rule.op2;
    };
    return CookieStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/SessionStorageStrategy.ts
var SessionStorageStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SessionStorageStrategy = (function (_super) {
    SessionStorageStrategy_extends(SessionStorageStrategy, _super);
    function SessionStorageStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SessionStorageStrategy.prototype.getType = function () {
        return "session_storage";
    };
    SessionStorageStrategy.prototype.getLeft = function (rule) {
        return getSessionStorageValue(rule.op1);
    };
    SessionStorageStrategy.prototype.getRight = function (rule) {
        return rule.op2;
    };
    return SessionStorageStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/HashStrategy.ts
var HashStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var HashStrategy = (function (_super) {
    HashStrategy_extends(HashStrategy, _super);
    function HashStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HashStrategy.prototype.getType = function () {
        return "hash";
    };
    HashStrategy.prototype.getLeft = function (_rule) {
        return RuleEngine_$wnd.location.hash;
    };
    return HashStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/HostnameStrategy.ts
var HostnameStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var HostnameStrategy = (function (_super) {
    HostnameStrategy_extends(HostnameStrategy, _super);
    function HostnameStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HostnameStrategy.prototype.getType = function () {
        return "hostname";
    };
    HostnameStrategy.prototype.getLeft = function (rule) {
        return RuleEngine_$wnd.location.hostname;
    };
    return HostnameStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/PathStrategy.ts
var PathStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PathStrategy = (function (_super) {
    PathStrategy_extends(PathStrategy, _super);
    function PathStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PathStrategy.prototype.getType = function () {
        return "path";
    };
    PathStrategy.prototype.getLeft = function (_rule) {
        return RuleEngine_$wnd.location.pathname;
    };
    return PathStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/QueryStrategy.ts
var QueryStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var QueryStrategy = (function (_super) {
    QueryStrategy_extends(QueryStrategy, _super);
    function QueryStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryStrategy.prototype.getType = function () {
        return "query";
    };
    QueryStrategy.prototype.getLeft = function (_rule) {
        return RuleEngine_$wnd.location.search;
    };
    return QueryStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/UrlStrategy.ts
var UrlStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var UrlStrategy = (function (_super) {
    UrlStrategy_extends(UrlStrategy, _super);
    function UrlStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlStrategy.prototype.getType = function () {
        return "url";
    };
    UrlStrategy.prototype.getLeft = function (_rule) {
        return RuleEngine_$wnd.location.href;
    };
    return UrlStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/FunctionStrategy.ts
var FunctionStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var FunctionStrategy = (function (_super) {
    FunctionStrategy_extends(FunctionStrategy, _super);
    function FunctionStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionStrategy.prototype.getType = function () {
        return "function";
    };
    FunctionStrategy.prototype.getLeft = function (rule) {
        var func = readFromWindow(rule.op1);
        return func != null && func != undefined ? func : null;
    };
    return FunctionStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/InnerTextStrategy.ts
var InnerTextStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var InnerTextStrategy = (function (_super) {
    InnerTextStrategy_extends(InnerTextStrategy, _super);
    function InnerTextStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerTextStrategy.prototype.getLeft = function (rule) {
        var elementHandler = new ElementHandler();
        return elementHandler.findFinalElement(JSON.parse(rule.element_meta));
    };
    InnerTextStrategy.prototype.getType = function () {
        return "inner_text";
    };
    InnerTextStrategy.prototype.isFit = function (rule) {
        var element = this.getLeft(rule);
        return this.compare(rule, element, null);
    };
    InnerTextStrategy.prototype.exists = function (leftValue, _rightValue) {
        return leftValue != null && leftValue != undefined;
    };
    return InnerTextStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/PageTagStrategy.ts
var PageTagStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PagetagStrategy = (function (_super) {
    PageTagStrategy_extends(PagetagStrategy, _super);
    function PagetagStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PagetagStrategy.prototype.getType = function () {
        return "page_tag";
    };
    PagetagStrategy.prototype.getLeft = function (rule) {
        return pageTagStore.getPageTags();
    };
    PagetagStrategy.prototype.exists = function (leftValue, rightValue) {
        if (leftValue != undefined && leftValue != null && leftValue.length > 0) {
            return leftValue.indexOf(rightValue) > -1;
        }
        return false;
    };
    return PagetagStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/AllPagesStrategy.ts
var AllPagesStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var AllPagesStrategy = (function (_super) {
    AllPagesStrategy_extends(AllPagesStrategy, _super);
    function AllPagesStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllPagesStrategy.prototype.getLeft = function (rule, _data) {
        return rule.type;
    };
    AllPagesStrategy.prototype.getType = function () {
        return "all_pages";
    };
    AllPagesStrategy.prototype.isFit = function (_rule, _data) {
        return true;
    };
    return AllPagesStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/AttributeStrategy.ts



var AttributeStrategy = (function () {
    function AttributeStrategy() {
    }
    AttributeStrategy.prototype.isFit = function (rule, visibility_rule) {
        return {
            isRecurringEvent: false,
            result: this.evaluate(rule, visibility_rule)
        };
    };
    AttributeStrategy.prototype.evaluate = function (rule, visibility_rule) {
        var _this = this;
        var rejectAccess = null;
        var callback = {
            onSuccess: function (event) { },
            onFailure: function (err) { }
        };
        var cancellablePromiseData = cancellablePromise(new Promise(function (resolve, reject) {
            rejectAccess = reject;
            var value = readFromWindow(_this.getAttrNamespace() + rule.op1);
            if (!value) {
                _this.fetchAttributeValues(callback);
            }
            else {
                if (_this.compare(rule)) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            callback.onSuccess = function (event) {
                if (_this.compare(rule)) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            };
            callback.onFailure = function (err) {
            };
        }));
        cancellablePromiseData.cancel = rejectAccess;
        return cancellablePromiseData;
    };
    AttributeStrategy.prototype.compare = function (rule) {
        var o1 = this.getLeft(rule);
        if (rule.operator === DateOperator.DATE_GREATER_THAN || rule.operator === DateOperator.DATE_LESS_THAN) {
            o1 = new Date(o1).getTime();
        }
        var o2 = this.getRight(rule);
        switch (rule.operator) {
            case NumberOperator.GREATER_THAN:
                return compareNumbers(o1, o2, true);
            case NumberOperator.LESS_THAN:
                return compareNumbers(o1, o2, false);
            case DateOperator.DATE_GREATER_THAN:
                return compareDates(o1, o2, true);
            case DateOperator.DATE_LESS_THAN:
                return compareDates(o1, o2, false);
            case Operators.EQUALS:
                return o1 == o2;
            case Operators.NOT_EQUALS:
                return o1 != o2;
            case Operators.CONTAINS:
                return o1.indexOf(o2) != -1;
            case Operators.DOES_NOT_CONTAIN:
                return o1.indexOf(o2) == -1;
            case Operators.STARTS_WITH:
                return o1.startsWith(o2);
            case Operators.ENDS_WITH:
                return o1.endsWith(o2);
        }
        return false;
    };
    AttributeStrategy.prototype.getRight = function (rule) {
        return rule.op2 ? rule.op2 : "";
    };
    return AttributeStrategy;
}());


;// CONCATENATED MODULE: ../src/ts/strategy/EntAttributeStrategy.ts
var EntAttributeStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var EntAttributeStrategy = (function (_super) {
    EntAttributeStrategy_extends(EntAttributeStrategy, _super);
    function EntAttributeStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntAttributeStrategy.prototype.getType = function () {
        return "ent_attribute";
    };
    EntAttributeStrategy.prototype.getLeft = function (rule) {
        var value = readFromWindow("_wfx_data.ent_attributes.all_attributes_map." + rule.op1);
        return value ? value : "";
    };
    EntAttributeStrategy.prototype.getAttrNamespace = function () {
        return "_wfx_data.ent_attributes.all_attributes_map.";
    };
    EntAttributeStrategy.prototype.fetchAttributeValues = function (callback) {
        getWfxNamespaceRef()._wfx_fetch_ent_attr(callback, "");
    };
    return EntAttributeStrategy;
}(AttributeStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/UserAttributeStrategy.ts
var UserAttributeStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var UserAttributeStrategy = (function (_super) {
    UserAttributeStrategy_extends(UserAttributeStrategy, _super);
    function UserAttributeStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserAttributeStrategy.prototype.getType = function () {
        return "user_attribute";
    };
    UserAttributeStrategy.prototype.getLeft = function (rule) {
        var value = readFromWindow("_wfx_data.end_user.custom." + rule.op1);
        return value ? value : "";
    };
    UserAttributeStrategy.prototype.getAttrNamespace = function () {
        return "_wfx_data.end_user.custom.";
    };
    UserAttributeStrategy.prototype.fetchAttributeValues = function (callback) {
        var ary = ["custom"];
        getWfxNamespaceRef()._wfx_fetch_user_attr(ary, callback);
    };
    return UserAttributeStrategy;
}(AttributeStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/SalesforceObjectStrategy.ts
var SalesforceObjectStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var SalesfoceObjectStrategy = (function (_super) {
    SalesforceObjectStrategy_extends(SalesfoceObjectStrategy, _super);
    function SalesfoceObjectStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SalesfoceObjectStrategy.prototype.getType = function () {
        return "salesforce";
    };
    SalesfoceObjectStrategy.prototype.getLeft = function (rule) {
        var winVar = _super.prototype.getLeft.call(this, rule);
        if (winVar instanceof Date) {
            winVar = winVar.getTime();
        }
        return winVar;
    };
    SalesfoceObjectStrategy.prototype.compare = function (rule, o1, o2) {
        switch (rule.operator) {
            case NumberOperator.GREATER_THAN:
                return compareNumbers(o1, o2, true);
            case NumberOperator.LESS_THAN:
                return compareNumbers(o1, o2, false);
            case DateOperator.DATE_GREATER_THAN:
                return compareDates(o1, o2, true);
            case DateOperator.DATE_LESS_THAN:
                return compareDates(o1, o2, false);
            default:
                return _super.prototype.compare.call(this, rule, o1, o2);
        }
    };
    return SalesfoceObjectStrategy;
}(WindowVariableStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/AllFlowsStrategy.ts
var AllFlowsStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AllFlowsStrategy = (function (_super) {
    AllFlowsStrategy_extends(AllFlowsStrategy, _super);
    function AllFlowsStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllFlowsStrategy.prototype.getLeft = function (rule, _data) {
        return rule.type;
    };
    AllFlowsStrategy.prototype.isFit = function (_rule, _data) {
        return true;
    };
    AllFlowsStrategy.prototype.getType = function () {
        return "all_flows";
    };
    return AllFlowsStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/AllSmartTipsStrategy.ts
var AllSmartTipsStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AllSmartTipsStrategy = (function (_super) {
    AllSmartTipsStrategy_extends(AllSmartTipsStrategy, _super);
    function AllSmartTipsStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllSmartTipsStrategy.prototype.getLeft = function (rule, _data) {
        return rule.type;
    };
    AllSmartTipsStrategy.prototype.isFit = function (_rule, _data) {
        return true;
    };
    AllSmartTipsStrategy.prototype.getType = function () {
        return "all_tips";
    };
    return AllSmartTipsStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/common/ExceptionHandler.ts
var ExceptionHandler = (function () {
    function ExceptionHandler() {
    }
    ExceptionHandler.execute = function (fn) {
        try {
            return fn();
        }
        catch (error) {
            return null;
        }
    };
    return ExceptionHandler;
}());


;// CONCATENATED MODULE: ../src/ts/common/PostMessager.ts

var listenerRegister = {};
var registerPostMessageListener = function (type, func) {
    if (listenerRegister[type]) {
        listenerRegister[type].push(func);
    }
    else {
        listenerRegister[type] = [func];
    }
};
var addPostMessageListener = function (type, func) {
    getWfxNamespaceRef().WFX.addListener(type, getCurrentModuleName());
    registerPostMessageListener(type, func);
};
var onMessageCallback = function (type, content) {
    var _a;
    (_a = listenerRegister[type]) === null || _a === void 0 ? void 0 : _a.forEach(function (callback) { return callback(type, content); });
};
var removeListener = function (type) {
    var _a, _b, _c, _d;
    delete (listenerRegister[type]);
    var crossMsgInstance = (_d = (_c = (_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a.WFX) === null || _b === void 0 ? void 0 : _b.CrossMessager) === null || _c === void 0 ? void 0 : _c.Provider) === null || _d === void 0 ? void 0 : _d.getInstance();
    crossMsgInstance === null || crossMsgInstance === void 0 ? void 0 : crossMsgInstance.removeAllListener(type);
};

;// CONCATENATED MODULE: ../src/ts/strategy/AppStateStrategy.ts
var __values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};










var segmentIdMap = {};
var atleastOneAppSpecificCondition;
var AppStateStrategy = (function () {
    function AppStateStrategy() {
        var _this = this;
        this.checkForOperations = function (operationObject, value) {
            if (!operationObject && operationObject === "") {
                return true;
            }
            var op3Object = JSON.parse(operationObject);
            switch (op3Object.type) {
                case OperationType.TEXT:
                case OperationType.NUMBER:
                    return _this.compare(op3Object, value);
                case OperationType.DATE:
                    return _this.compareDate(op3Object, value);
            }
            return false;
        };
        this.extractDateFromString = function (inputString, format) {
            if (!DATE_FORMAT_MAP.hasOwnProperty(format)) {
                return null;
            }
            var dateFormatObject = DATE_FORMAT_MAP[format];
            var match = inputString.match(dateFormatObject.regex);
            if (match) {
                match.shift();
                var day = parseInt(match[dateFormatObject.day]);
                var month = dateFormatObject.getMonthFromName ? MONTH_MAP[match[dateFormatObject.month]] : parseInt(match[dateFormatObject.month]);
                var year = parseInt(match[dateFormatObject.year]);
                var supportedFormat = "".concat(month, "-").concat(day, "-").concat(year);
                return new Date(supportedFormat);
            }
            return null;
        };
        window.removeEventListener('storage', ExceptionHandler.execute(function () { return _this.handleStorageChange.bind(_this); }));
        window.addEventListener('storage', ExceptionHandler.execute(function () { return _this.handleStorageChange.bind(_this); }));
        window.cookieStore.removeEventListener('change', ExceptionHandler.execute(function () { return _this.handleCookieStoreListener.bind(_this); }));
        window.cookieStore.addEventListener('change', ExceptionHandler.execute(function () { return _this.handleCookieStoreListener.bind(_this); }));
    }
    AppStateStrategy.prototype.getType = function () {
        return "application_state";
    };
    AppStateStrategy.prototype.getLeft = function (rule) {
        return rule.type;
    };
    AppStateStrategy.prototype.isFit = function (rule, visibility_rule, whenAggregator, ruleId) {
        var _this = this;
        updateSegmentIdMap(rule, visibility_rule, ruleId);
        var isRecurringEvent = true;
        switch (rule.op1) {
            case "local_storage":
                return {
                    isRecurringEvent: isRecurringEvent,
                    result: this.setupListeners(rule, getLocalStorageValue(rule.op3), visibility_rule, whenAggregator, ruleId)
                };
            case "session_storage":
                return {
                    isRecurringEvent: isRecurringEvent,
                    result: this.setupListeners(rule, getSessionStorageValue(rule.op3), visibility_rule, whenAggregator, ruleId)
                };
            case "cookies":
                return {
                    isRecurringEvent: isRecurringEvent,
                    result: this.setupListeners(rule, getCookieValue(rule.op3), visibility_rule, whenAggregator, ruleId)
                };
            case "variable":
                return {
                    isRecurringEvent: isRecurringEvent,
                    result: this.setupListeners(rule, readFromWindow(rule.op3), visibility_rule, whenAggregator, ruleId)
                };
            case "element":
                return {
                    isRecurringEvent: isRecurringEvent,
                    result: ExceptionHandler.execute(function () { return _this.isElementValid(rule, visibility_rule, whenAggregator, ruleId); })
                };
            case AppSpecificRuleObject.WORKDAY_DATA:
                return {
                    isRecurringEvent: isRecurringEvent,
                    result: this.setupListeners(rule, getWorkdayDataValue(), visibility_rule, whenAggregator, ruleId)
                };
            default:
                return {
                    isRecurringEvent: false,
                    result: Promise.resolve(false)
                };
        }
    };
    AppStateStrategy.prototype.isKeyValid = function (rule, value, visibility_rule, whenAggregator, ruleId, resolve, reject) {
        var exist = value != null;
        switch (rule.operator) {
            case Operators.EXISTS:
                if (exist) {
                    setAggregator(visibility_rule, whenAggregator, ruleId, true);
                    resolve ? resolve(true) : '';
                }
                else {
                    setAggregator(visibility_rule, whenAggregator, ruleId, false);
                }
                break;
            case Operators.COMPARE:
                if (exist) {
                    var parsedValue = AppSpecificEvaluationValid.has(rule === null || rule === void 0 ? void 0 : rule.op1) && value ? JSON.parse(value) : {};
                    value = Object.keys(parsedValue).length !== 0 && parsedValue[rule === null || rule === void 0 ? void 0 : rule.op3] ? parsedValue[rule === null || rule === void 0 ? void 0 : rule.op3] : value;
                    var isEvaluationValid = this.checkForOperations(rule === null || rule === void 0 ? void 0 : rule.op4, value);
                    if (isEvaluationValid) {
                        setAggregator(visibility_rule, whenAggregator, ruleId, true);
                        resolve ? resolve(isEvaluationValid) : '';
                    }
                    else {
                        setAggregator(visibility_rule, whenAggregator, ruleId, false);
                        reject ? reject(isEvaluationValid) : '';
                    }
                }
                else {
                    setAggregator(visibility_rule, whenAggregator, ruleId, false);
                }
                break;
            case Operators.NOT_EXISTS:
                if (!exist) {
                    setAggregator(visibility_rule, whenAggregator, ruleId, true);
                    resolve ? resolve(true) : '';
                }
                else {
                    setAggregator(visibility_rule, whenAggregator, ruleId, false);
                    reject ? reject(true) : '';
                }
                break;
            default: {
                reject ? reject(false) : '';
                setAggregator(visibility_rule, whenAggregator, ruleId, false);
                break;
            }
        }
        ;
    };
    AppStateStrategy.prototype.handleStorageChange = function (event) {
        var _this = this;
        var segmentData = [];
        if (event.storageArea === localStorage) {
            segmentData = getSegmentIdData("ls-".concat(event.key));
        }
        if (event.storageArea === sessionStorage) {
            segmentData = getSegmentIdData("ss-".concat(event.key));
        }
        segmentData === null || segmentData === void 0 ? void 0 : segmentData.forEach(function (rules) {
            _this.isKeyValid(rules.extractedRule, event.newValue, rules.extractedVisibilityRule, whenAggregator, rules.extractedRuleId);
        });
    };
    AppStateStrategy.prototype.handleCookieStoreListener = function (event) {
        var _this = this;
        var newValue = getCookieValue(event.key);
        var segmentData = getSegmentIdData("c-".concat(event.key));
        segmentData === null || segmentData === void 0 ? void 0 : segmentData.forEach(function (rules) {
            _this.isKeyValid(rules.extractedRule, newValue, rules.extractedVisibilityRule, whenAggregator, rules.extractedRuleId);
        });
    };
    AppStateStrategy.prototype.setupListeners = function (rule, value, visibility_rule, whenAggregator, ruleId) {
        var _this = this;
        var key = rule.op3;
        var rejectAccess = null;
        var resolveAccess = null;
        var cancellablePromiseData = cancellablePromise(new Promise(function (resolve, reject) {
            rejectAccess = reject;
            resolveAccess = resolve;
            _this.validateWorkdayDataConditions(rule);
            ExceptionHandler.execute(function () { return _this.isKeyValid(rule, value, visibility_rule, whenAggregator, ruleId, resolveAccess, rejectAccess); });
        }));
        switch (rule.op1) {
            case ('variable'):
                this.setupVariableListener(rule, key, resolveAccess, rejectAccess, visibility_rule, whenAggregator, ruleId);
                break;
            default: break;
        }
        cancellablePromiseData.cancel = rejectAccess;
        return cancellablePromiseData;
    };
    AppStateStrategy.prototype.setupVariableListener = function (rule, key, resolve, reject, visibility_rule, whenAggregator, ruleId) {
        var _this = this;
        function watchWindowVariable(obj, propName, callback) {
            var e_1, _a;
            var props = propName.split('.');
            var lastProp = props.pop();
            if (!lastProp) {
                return;
            }
            var currentObj = obj;
            try {
                for (var props_1 = __values(props), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                    var prop = props_1_1.value;
                    if (!(prop in currentObj)) {
                        currentObj[prop] = {};
                    }
                    currentObj = currentObj[prop];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (props_1_1 && !props_1_1.done && (_a = props_1.return)) _a.call(props_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var value = currentObj[lastProp];
            Object.defineProperty(currentObj, lastProp, {
                get: function () {
                    return value;
                },
                set: function (newValue) {
                    value = newValue;
                    callback(newValue);
                }
            });
        }
        ExceptionHandler.execute(function () { return watchWindowVariable(RuleEngine_$wnd, key, function () {
            getSegmentIdData(VARIABLE_PREFIX + key).forEach(function (rules) {
                _this.isKeyValid(rules.extractedRule, readFromWindow(key), rules.extractedVisibilityRule, whenAggregator, rules.extractedRuleId);
            });
        }); });
    };
    AppStateStrategy.prototype.isElementValid = function (rule, visibility_rule, whenAggregator, ruleId) {
        var _this = this;
        var _a, _b, _c, _d;
        var selectorValue = rule.op3;
        if (selectorValue.indexOf("<<") !== -1) {
            var split = selectorValue.lastIndexOf("<<");
            var selectorElements = findBySelector(RuleEngine_$wnd.document, rule.op2, selectorValue.substring(split + 2).trim());
            if (selectorElements.length > 0) {
                var resolveRef_1 = null;
                var rejectRef_1 = null;
                var promise = new Promise(function (resolve, reject) {
                    resolveRef_1 = resolve;
                    rejectRef_1 = reject;
                });
                var cancellablePromiseData = cancellablePromise(promise, 1500);
                cancellablePromiseData.cancel = rejectRef_1;
                var listenerType = "element_found_" + new Date().getTime();
                addPostMessageListener(listenerType, function (type, content) { return _this.onFinalElementFound(type, content, visibility_rule, ruleId, resolveRef_1, rejectRef_1); });
                var data = {};
                data.type = listenerType;
                data.selector = selectorValue.substring(0, split);
                data.visibility_id = visibility_rule.visibility_id;
                data.rule = rule;
                var crossMsgInstance = (_d = (_c = (_b = (_a = RuleEngine_$wnd[getWfxNamespace()]) === null || _a === void 0 ? void 0 : _a.WFX) === null || _b === void 0 ? void 0 : _b.CrossMessager) === null || _c === void 0 ? void 0 : _c.Provider) === null || _d === void 0 ? void 0 : _d.getInstance();
                crossMsgInstance === null || crossMsgInstance === void 0 ? void 0 : crossMsgInstance.sendMessageToFrame(selectorElements[0], "find_element_ce", JSON.stringify(data));
                return cancellablePromiseData;
            }
        }
        else {
            var moJson = {};
            moJson.body = RuleEngine_$wnd.document.body;
            moJson.moConfig = ["attributes", "childList", "subtree"];
            moJson.moType = "customization_engine";
            return initializeMOWithCancellablePromise(moJson, rule, visibility_rule, ruleId);
        }
    };
    AppStateStrategy.prototype.onFinalElementFound = function (type, content, visibilityRule, ruleId, resolve, reject) {
        var data = JSON.parse(content);
        setAggregator(visibilityRule, whenAggregator, ruleId, data.evalResult);
        if (data.evalResult) {
            resolve(data.evalResult);
        }
        else {
            reject(data.evalResult);
        }
    };
    AppStateStrategy.prototype.exists = function (leftValue, _rightValue) {
        return leftValue != undefined && leftValue != null && leftValue;
    };
    AppStateStrategy.prototype.compare = function (operationObject, extractedValue) {
        var ruleValue1 = operationObject === null || operationObject === void 0 ? void 0 : operationObject.op1;
        var ruleValue2 = operationObject === null || operationObject === void 0 ? void 0 : operationObject.op2;
        switch (operationObject.operator) {
            case NumberOperator.EQUALS:
            case Operators.EQUALS:
                return ruleValue1 == extractedValue;
            case NumberOperator.NOT_EQUALS:
            case Operators.NOT_EQUALS:
                return ruleValue1 != extractedValue;
            case Operators.CONTAINS:
            case Operators.EXISTS:
                return extractedValue.indexOf && extractedValue.indexOf(ruleValue1) !== -1;
            case Operators.DOES_NOT_CONTAIN:
            case Operators.NOT_EXISTS:
                return extractedValue.indexOf && extractedValue.indexOf(ruleValue1) === -1;
            case Operators.STARTS_WITH:
                return extractedValue.startsWith && extractedValue.startsWith(ruleValue1);
            case Operators.ENDS_WITH:
                return extractedValue.endsWith && extractedValue.endsWith(ruleValue1);
            case Operators.REGEX:
                return extractedValue.match && extractedValue.match(ruleValue1);
            case Operators.IS_BLANK:
                return !!extractedValue;
            case Operators.IS_NOT_BLANK:
                return extractedValue && extractedValue != "";
            case NumberOperator.GREATER_THAN:
                return extractedValue > ruleValue1;
            case NumberOperator.LESS_THAN:
                return extractedValue < ruleValue1;
            case NumberOperator.BETWEEN:
                if (ruleValue1 && ruleValue2) {
                    return extractedValue >= ruleValue1 && extractedValue <= ruleValue2;
                }
                if (ruleValue1) {
                    return extractedValue >= ruleValue1;
                }
                if (ruleValue2) {
                    return extractedValue <= ruleValue2;
                }
        }
        return false;
    };
    AppStateStrategy.prototype.compareDate = function (ruleComparatorObject, extractedValue) {
        var format = ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.op4;
        var operator = ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.operator;
        var startBoundValue = (ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.op5) || this.extractDateFromString(ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.op1, format) || '';
        var endBoundValue = (ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.op6) || this.extractDateFromString(ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.op2, format) || '';
        var extractedValueDate = this.extractDateFromString(extractedValue, format);
        var startBoundValueDate = startBoundValue ? new Date(startBoundValue) : null;
        var endBoundValueDate = endBoundValue ? new Date(endBoundValue) : null;
        if (!extractedValueDate && (!startBoundValueDate || !endBoundValueDate)) {
            return false;
        }
        var extractedValueTime = !!extractedValueDate ? extractedValueDate.getTime() : 0;
        var startBoundValueTime = !!startBoundValueDate ? startBoundValueDate.getTime() : 0;
        var endBoundValueTime = !!endBoundValueDate ? endBoundValueDate.getTime() : 0;
        switch (operator) {
            case DateOperator.ON:
                return extractedValueTime == startBoundValueTime;
            case DateOperator.AFTER:
                return extractedValueTime > startBoundValueTime;
            case DateOperator.BEFORE:
                return extractedValueTime < startBoundValueTime;
            case DateOperator.BETWEEN:
                if (startBoundValueDate && endBoundValueDate) {
                    return extractedValueTime >= startBoundValueTime && extractedValueTime <= endBoundValueTime;
                }
                if (startBoundValueDate) {
                    return extractedValueTime >= startBoundValueTime;
                }
                if (endBoundValueDate) {
                    return extractedValueTime <= endBoundValueTime;
                }
                return;
        }
        return false;
    };
    AppStateStrategy.prototype.validateWorkdayDataConditions = function (rule) {
        if (atleastOneAppSpecificCondition)
            return;
        if (rule && (rule === null || rule === void 0 ? void 0 : rule.op1) === AppSpecificRuleObject.WORKDAY_DATA) {
            atleastOneAppSpecificCondition = true;
            getWfxNamespaceRef().populateAppSpecificVariables();
        }
    };
    return AppStateStrategy;
}());


;// CONCATENATED MODULE: ../src/ts/strategy/DateStrategy.ts
var DateStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var DateStrategy = (function (_super) {
    DateStrategy_extends(DateStrategy, _super);
    function DateStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateStrategy.prototype.getType = function () {
        return "date_comparison";
    };
    DateStrategy.prototype.isFit = function (rule) {
        var left = this.getLeft(rule);
        var right = Number(this.getRight(rule));
        return this._compare(rule, left, right);
    };
    DateStrategy.prototype.getLeft = function (rule) {
        var time = readFromWindow(rule.op1);
        var leftValue = new Date(time).getTime();
        return leftValue;
    };
    DateStrategy.prototype.getRight = function (rule) {
        return rule.op2;
    };
    DateStrategy.prototype._compare = function (rule, o1, o2) {
        switch (rule.operator) {
            case "greaterThan":
                return o2 > o1;
            case "lessThan":
                return o2 < o1;
        }
    };
    return DateStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/SchedulingStrategy.ts
var SchedulingStrategy = (function () {
    function SchedulingStrategy() {
    }
    return SchedulingStrategy;
}());


;// CONCATENATED MODULE: ../src/ts/strategy/EndTimeStrategy.ts
var EndTimeStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var RulePattern;
(function (RulePattern) {
    RulePattern["END_DATE"] = "specific_date";
    RulePattern["NEVER"] = "never";
    RulePattern["TIMES_TO_SHOW"] = "x_times";
})(RulePattern || (RulePattern = {}));
var EndTimeStrategy = (function (_super) {
    EndTimeStrategy_extends(EndTimeStrategy, _super);
    function EndTimeStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EndTimeStrategy.prototype.getType = function () {
        return "end_time";
    };
    EndTimeStrategy.prototype.isFit = function (rule) {
        var result = false;
        switch (rule.ends_type) {
            case RulePattern.NEVER:
            case RulePattern.TIMES_TO_SHOW:
                result = true;
                break;
        }
        return result;
    };
    return EndTimeStrategy;
}(SchedulingStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/FlowStrategy.ts
var FlowStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var FlowStrategy = (function (_super) {
    FlowStrategy_extends(FlowStrategy, _super);
    function FlowStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FlowStrategy.prototype.getLeft = function (_rule, data) {
        return data.id;
    };
    FlowStrategy.prototype.getType = function () {
        return "flow";
    };
    return FlowStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/PopupSegmentStrategy.ts
var PopupSegmentStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var PopupSegmentStrategy = (function (_super) {
    PopupSegmentStrategy_extends(PopupSegmentStrategy, _super);
    function PopupSegmentStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopupSegmentStrategy.prototype.getLeft = function (_rule, data) {
        return data.segment_id;
    };
    PopupSegmentStrategy.prototype.getType = function () {
        return "popup_segment";
    };
    return PopupSegmentStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/SmartTipStrategy.ts
var SmartTipStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SmartTipStrategy = (function (_super) {
    SmartTipStrategy_extends(SmartTipStrategy, _super);
    function SmartTipStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmartTipStrategy.prototype.getLeft = function (_rule, data) {
        return data.id;
    };
    SmartTipStrategy.prototype.getType = function () {
        return "tip";
    };
    return SmartTipStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/StartTimeStrategy.ts
var StartTimeStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var DATE_TIME_INTERVALS;
(function (DATE_TIME_INTERVALS) {
    DATE_TIME_INTERVALS["DAILY"] = "onceDaily";
    DATE_TIME_INTERVALS["ONCE_WEEKLY"] = "onceWeekly";
    DATE_TIME_INTERVALS["ONCE_MONTHLY"] = "onceMonthly";
    DATE_TIME_INTERVALS["EVERY_WEEKDAY"] = "everyWeekday";
    DATE_TIME_INTERVALS["CERTAIN_DAYS"] = "selectDays";
    DATE_TIME_INTERVALS["WEEKLY"] = "weekly";
    DATE_TIME_INTERVALS["MONTHLY"] = "monthly";
    DATE_TIME_INTERVALS["ANNUALLY"] = "annually";
    DATE_TIME_INTERVALS["DO_NOT_REPEAT"] = "doesNotRepeat";
    DATE_TIME_INTERVALS["CUSTOM"] = "custom";
    DATE_TIME_INTERVALS["DAYS"] = "days";
    DATE_TIME_INTERVALS["MONTHS"] = "months";
    DATE_TIME_INTERVALS["WEEKS"] = "weeks";
    DATE_TIME_INTERVALS["YEARS"] = "years";
})(DATE_TIME_INTERVALS || (DATE_TIME_INTERVALS = {}));
var StartTimeStrategy = (function (_super) {
    StartTimeStrategy_extends(StartTimeStrategy, _super);
    function StartTimeStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getFormattedRules = function (rule) {
            var endTime = rule.endTime, startTime = rule.startTime, intervals = rule.intervals, timezone = rule.timezone;
            if (timezone !== DateConstants.TIMEZONE_ABSOLUTE) {
                startTime += "Z";
                endTime += "Z";
            }
            var endDateTime = isNaN(new Date(endTime).getTime()) ? null : new Date(endTime);
            var startDateTime = isNaN(new Date(startTime).getTime()) ? null : new Date(startTime);
            var intervalsInDateTime = [];
            if (intervals && intervals.length > 0) {
                var tempIntervals = JSON.parse(intervals);
                intervalsInDateTime = tempIntervals.map(function (intervals) {
                    var startInterval = intervals.startInterval, endInterval = intervals.endInterval;
                    if (timezone !== DateConstants.TIMEZONE_ABSOLUTE) {
                        startInterval += "Z";
                        endInterval += "Z";
                    }
                    return {
                        startInterval: isNaN(new Date(startInterval).getTime()) ? null : new Date(startInterval),
                        endInterval: isNaN(new Date(endInterval).getTime()) ? null : new Date(endInterval),
                    };
                });
            }
            var currentDateTime = new Date();
            return __assign({ startDateTime: startDateTime, endDateTime: endDateTime, currentDateTime: currentDateTime, intervalsInDateTime: intervalsInDateTime }, rule);
        };
        _this.compareTime = function (interval, currentDateTime) {
            var startMinutes = (interval.startInterval.getHours() * 60) + interval.startInterval.getMinutes();
            var endMinutes = (interval.endInterval.getHours() * 60) + interval.endInterval.getMinutes();
            var currentMinutes = (currentDateTime.getHours() * 60) + currentDateTime.getMinutes();
            if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
                return true;
            }
            return false;
        };
        _this.getTimeZoneOffset = function (timezone) {
            var configuredTimezoneOffset = new Date().getTimezoneOffset() * -1;
            if (timezone && timezone.indexOf(DateConstants.TIMEZONE_ABSOLUTE) === -1) {
                var sign = timezone.charAt(4) == "+" ? 1 : -1;
                var hour = parseInt(timezone.substring(5, timezone.indexOf(":")));
                var min = parseInt(timezone.substring(timezone.indexOf(":") + 1, timezone.indexOf(":") + 3));
                configuredTimezoneOffset = sign * (hour * 60 + min);
            }
            return configuredTimezoneOffset * 60 * 1000;
        };
        return _this;
    }
    StartTimeStrategy.prototype.getType = function () {
        return "start_date";
    };
    StartTimeStrategy.prototype.isFit = function (rule) {
        if (!(rule === null || rule === void 0 ? void 0 : rule.startTime)) {
            return false;
        }
        var formattedRules = this.getFormattedRules(rule);
        var endDateTime = formattedRules.endDateTime, startDateTime = formattedRules.startDateTime, currentDateTime = formattedRules.currentDateTime, intervalsInDateTime = formattedRules.intervalsInDateTime, repeat_rule = formattedRules.repeat_rule;
        var isTimeValid = false;
        if (!endDateTime) {
            isTimeValid = currentDateTime >= startDateTime;
        }
        else {
            isTimeValid = currentDateTime >= startDateTime && currentDateTime <= endDateTime;
        }
        if (!isTimeValid) {
            return false;
        }
        if (!this.isTimeBetweenInterval(intervalsInDateTime, currentDateTime)) {
            return false;
        }
        var result = false;
        switch (repeat_rule) {
            case DATE_TIME_INTERVALS.DAILY:
            case DATE_TIME_INTERVALS.ONCE_WEEKLY:
            case DATE_TIME_INTERVALS.ONCE_MONTHLY:
                result = true;
                break;
            case DATE_TIME_INTERVALS.WEEKLY:
            case DATE_TIME_INTERVALS.EVERY_WEEKDAY:
            case DATE_TIME_INTERVALS.CERTAIN_DAYS:
                result = this.checkWeekDay(formattedRules);
                break;
            case DATE_TIME_INTERVALS.MONTHLY:
                result = this.checkMonthly(formattedRules);
                break;
            case DATE_TIME_INTERVALS.ANNUALLY:
                result = this.checkYearly(formattedRules);
                break;
            case DATE_TIME_INTERVALS.DO_NOT_REPEAT:
                result = true;
                break;
            case DATE_TIME_INTERVALS.CUSTOM:
                result = this.checkCustomRepeat(formattedRules);
                break;
            default:
                result = true;
                break;
        }
        return result;
    };
    StartTimeStrategy.prototype.isTimeBetweenInterval = function (intervals, currentDateTime) {
        var _this = this;
        if (intervals && intervals.length > 0) {
            return intervals.some(function (interval) {
                var isWithInInterval = _this.compareTime(interval, currentDateTime);
                return isWithInInterval;
            });
        }
        return true;
    };
    StartTimeStrategy.prototype.checkWeekDay = function (rule) {
        var currentDateTime = rule.currentDateTime, startDateTime = rule.startDateTime, repeat_every = rule.repeat_every, repeat_on = rule.repeat_on;
        if (!repeat_on || repeat_every != DATE_TIME_INTERVALS.WEEKS) {
            return false;
        }
        if (repeat_on.indexOf("".concat(currentDateTime.getDay())) == -1) {
            return false;
        }
        return true;
    };
    StartTimeStrategy.prototype.checkDay = function (rule) {
        var currentDateTime = rule.currentDateTime, startDateTime = rule.startDateTime, repeat_every = rule.repeat_every, repeat_interval = rule.repeat_interval;
        if (repeat_every != DATE_TIME_INTERVALS.DAYS) {
            return false;
        }
        var diff = currentDateTime.getTime() - startDateTime.getTime();
        diff /= (1000 * 60 * 60 * 24);
        return Math.ceil(diff) >= repeat_interval;
    };
    StartTimeStrategy.prototype.checkMonthly = function (rule) {
        var currentDateTime = rule.currentDateTime, repeat_on = rule.repeat_on, repeat_every = rule.repeat_every;
        if (!repeat_on || repeat_every != DATE_TIME_INTERVALS.MONTHS) {
            return false;
        }
        var repeatSplits = repeat_on.split("_");
        return repeatSplits.length == 3 ? currentDateTime.getDate() === this.getNthDayInMonth(parseInt(repeatSplits[1]), parseInt(repeatSplits[2]), currentDateTime).getDate() : false;
    };
    StartTimeStrategy.prototype.getNthDayInMonth = function (nth, day, month) {
        var date = new Date(month.getFullYear(), month.getMonth());
        var nthDate = new Date().setDate(1 + (7 - date.getDay() + day) % 7 + (nth - 1) * 7);
        if (new Date(nthDate).getMonth() !== month.getMonth()) {
            date.setDate(1 + (7 - date.getDay() + day) % 7 + (nth - 2) * 7);
        }
        else {
            date.setDate(1 + (7 - date.getDay() + day) % 7 + (nth - 1) * 7);
        }
        return date;
    };
    StartTimeStrategy.prototype.checkYearly = function (rule) {
        var currentDateTime = rule.currentDateTime, repeat_every = rule.repeat_every, repeat_on = rule.repeat_on;
        if (!repeat_on || repeat_every != DATE_TIME_INTERVALS.YEARS) {
            return false;
        }
        var repeatSplits = repeat_on.split("_");
        return repeatSplits.length === 3 ? currentDateTime.getMonth() == parseInt(repeatSplits[1]) && currentDateTime.getDate() == parseInt(repeatSplits[2]) : false;
    };
    StartTimeStrategy.prototype.checkCustomRepeat = function (rule) {
        switch (rule.repeat_every) {
            case DATE_TIME_INTERVALS.DAYS:
                return this.checkDay(rule);
            case DATE_TIME_INTERVALS.WEEKS:
                return this.checkWeekDay(rule);
            case DATE_TIME_INTERVALS.MONTHS:
                return this.checkMonthly(rule);
            case DATE_TIME_INTERVALS.YEARS:
                return this.checkYearly(rule);
        }
    };
    StartTimeStrategy.prototype.getCurrentTime = function (timezone) {
        var curDateTime = new Date();
        var timeZoneOffSetProvidedInRule = this.getTimeZoneOffset(timezone);
        var currentTimeZoneOffset = (curDateTime.getTimezoneOffset() * 60 * 1000);
        var GMTDateTime = curDateTime.getTime() + currentTimeZoneOffset;
        return new Date(GMTDateTime + timeZoneOffSetProvidedInRule);
    };
    return StartTimeStrategy;
}(SchedulingStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/SurveySegmentStrategy.ts
var SurveySegmentStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var SurveySegmentStrategy = (function (_super) {
    SurveySegmentStrategy_extends(SurveySegmentStrategy, _super);
    function SurveySegmentStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SurveySegmentStrategy.prototype.getLeft = function (_rule, data) {
        return data.segment_id;
    };
    SurveySegmentStrategy.prototype.getType = function () {
        return "survey_segment";
    };
    return SurveySegmentStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/TasklistSegmentStrategy.ts
var TasklistSegmentStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TaskListSegmentStrategy = (function (_super) {
    TasklistSegmentStrategy_extends(TaskListSegmentStrategy, _super);
    function TaskListSegmentStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TaskListSegmentStrategy.prototype.getLeft = function (_rule, data) {
        return data.segment_id;
    };
    TaskListSegmentStrategy.prototype.getType = function () {
        return "tasklist_segment";
    };
    return TaskListSegmentStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/TitleStrategy.ts
var TitleStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TitleStrategy = (function (_super) {
    TitleStrategy_extends(TitleStrategy, _super);
    function TitleStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TitleStrategy.prototype.getLeft = function (_rule, data) {
        return data.title;
    };
    TitleStrategy.prototype.getType = function () {
        return "title";
    };
    return TitleStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/evaluateStrategies/initCustomEventMap.ts



var SEGMENT_TYPE;
(function (SEGMENT_TYPE) {
    SEGMENT_TYPE["FLOW"] = "flow";
    SEGMENT_TYPE["POPUP"] = "popup";
    SEGMENT_TYPE["SURVEY"] = "survey";
})(SEGMENT_TYPE || (SEGMENT_TYPE = {}));
var initCustomEventMap = function () {
    var FLOW = CUSTOM_EVENTS.FLOW, AUTO_FLOW_TIPS = CUSTOM_EVENTS.AUTO_FLOW_TIPS, POPUP = CUSTOM_EVENTS.POPUP, TASK_LIST = CUSTOM_EVENTS.TASK_LIST, SELF_HELP = CUSTOM_EVENTS.SELF_HELP, SURVEY = CUSTOM_EVENTS.SURVEY, FINDER_SC = CUSTOM_EVENTS.FINDER_SC, END_MESSAGE = CUSTOM_EVENTS.END_MESSAGE, TIP = CUSTOM_EVENTS.TIP, USER_ACTION = CUSTOM_EVENTS.USER_ACTION, BEACON = CUSTOM_EVENTS.BEACON;
    initSegmentCustomEvents(FLOW);
    initSegmentCustomEvents(AUTO_FLOW_TIPS);
    initSegmentCustomEvents(POPUP);
    initSegmentCustomEvents(TASK_LIST);
    initSegmentCustomEvents(SELF_HELP);
    initSegmentCustomEvents(SURVEY);
    initSegmentCustomEvents(FINDER_SC);
    initSegmentCustomEvents(END_MESSAGE);
    initSegmentCustomEvents(TIP);
    initSegmentCustomEvents(USER_ACTION);
    initSegmentCustomEvents(BEACON);
};
var initSegmentCustomEvents = function (segment) {
    Object.values(segment).forEach(function (eventName) {
        $whatfix_custom_events.set(eventName, new WfxMap());
    });
};
var createUniqueId = function (segment_id, step) {
    return !!step ? "".concat(segment_id, "_").concat(step) : "".concat(segment_id);
};
var addEventListnerForRule = function (rule, visibility_rule, callBackFunc, functionName) {
    var unique_id = createUniqueId(rule === null || rule === void 0 ? void 0 : rule.op2, rule === null || rule === void 0 ? void 0 : rule.op4);
    $whatfix_custom_events.get(functionName || rule.op3).set(unique_id, {
        modified_time: visibility_rule.modification_time,
        callback: callBackFunc
    });
    return unique_id;
};
var checkIfListenerCanBeAdded = function (rule, visibility_rule, functionName) {
    var unique_id = createUniqueId(rule === null || rule === void 0 ? void 0 : rule.op2, rule === null || rule === void 0 ? void 0 : rule.op4);
    var getCurrentEventMap = $whatfix_custom_events.get(functionName || rule.op3);
    if (getCurrentEventMap.has(unique_id)) {
        var currentCallbackmodifiedTime = getCurrentEventMap.get(unique_id).modified_time;
        if (currentCallbackmodifiedTime < visibility_rule.modification_time) {
            return true;
        }
        else {
            return false;
        }
    }
    return true;
};
var removeEventListnerForRule = function (eventName, callBackId) {
    $whatfix_custom_events.get(eventName).delete(callBackId);
};

;// CONCATENATED MODULE: ../src/ts/strategy/UserActionStrategy.ts



var UserActionStrategy = (function () {
    function UserActionStrategy() {
        this.addCustomEventListener = function (rule, visibility_rule, whenAggregator, ruleId) {
            var isFit = false;
            var canBeAdded = checkIfListenerCanBeAdded(rule, visibility_rule, "onUserActionCompletion");
            if (!canBeAdded) {
                return Promise.resolve(false);
            }
            var callbackId = "";
            var rejectAccess = null;
            var resolveAccess = null;
            var cancellablePromiseData = cancellablePromise(new Promise(function (resolve, reject) {
                rejectAccess = reject;
                resolveAccess = resolve;
            }));
            var listenerFunction = function (data) {
                if ((rule === null || rule === void 0 ? void 0 : rule.op2) === (data === null || data === void 0 ? void 0 : data.id) && rule.operator == "complete") {
                    isFit = true;
                }
                if (isFit) {
                    setAggregator(visibility_rule, whenAggregator, ruleId, true, true);
                    resolveAccess(isFit);
                }
                else {
                    setAggregator(visibility_rule, whenAggregator, ruleId, false, true);
                }
            };
            callbackId = addEventListnerForRule(rule, visibility_rule, listenerFunction, "onUserActionCompletion");
            cancellablePromiseData.catch(function () {
                removeEventListnerForRule("onUserActionCompletion", callbackId);
            });
            cancellablePromiseData.cancel = rejectAccess;
            return cancellablePromiseData;
        };
    }
    UserActionStrategy.prototype.getType = function () {
        return "user_action";
    };
    UserActionStrategy.prototype.getLeft = function (rule) {
        return rule.type;
    };
    UserActionStrategy.prototype.isFit = function (rule, visibility_rule, whenAggregator, ruleId) {
        return {
            isRecurringEvent: true,
            result: this.addCustomEventListener(rule, visibility_rule, whenAggregator, ruleId)
        };
    };
    return UserActionStrategy;
}());


;// CONCATENATED MODULE: ../src/ts/strategy/WfxEventsStrategy.ts



var WfxEventsStrategy = (function () {
    function WfxEventsStrategy() {
        this.addCustomEventListener = function (rule, visibility_rule, whenAggregator, ruleId) {
            var isFit = false;
            var canBeAdded = checkIfListenerCanBeAdded(rule, visibility_rule);
            if (!canBeAdded) {
                return Promise.resolve(false);
            }
            var callbackId = "";
            var rejectAccess = null;
            var resolveAccess = null;
            var cancellablePromiseData = cancellablePromise(new Promise(function (resolve, reject) {
                rejectAccess = reject;
                resolveAccess = resolve;
            }));
            var listenerFunction = function (data) {
                var _a, _b;
                if (((_a = rule === null || rule === void 0 ? void 0 : rule.op1) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = data === null || data === void 0 ? void 0 : data.type) === null || _b === void 0 ? void 0 : _b.toLowerCase()) && (rule === null || rule === void 0 ? void 0 : rule.op2) === (data === null || data === void 0 ? void 0 : data.id) && (rule === null || rule === void 0 ? void 0 : rule.op3) === (data === null || data === void 0 ? void 0 : data.functionName)) {
                    if (rule.op1 === SEGMENT_TYPE.FLOW) {
                        isFit = ((rule === null || rule === void 0 ? void 0 : rule.op4) || "") === ((data === null || data === void 0 ? void 0 : data.step) || "");
                    }
                    else {
                        isFit = true;
                    }
                }
                if (isFit) {
                    setAggregator(visibility_rule, whenAggregator, ruleId, true, true);
                    resolveAccess(isFit);
                }
                else {
                    setAggregator(visibility_rule, whenAggregator, ruleId, false, true);
                }
            };
            callbackId = addEventListnerForRule(rule, visibility_rule, listenerFunction);
            cancellablePromiseData.catch(function () {
                removeEventListnerForRule(rule.op3, callbackId);
            });
            cancellablePromiseData.cancel = rejectAccess;
            return cancellablePromiseData;
        };
    }
    WfxEventsStrategy.prototype.getType = function () {
        return "wfx_events";
    };
    WfxEventsStrategy.prototype.getLeft = function (rule) {
        return rule.type;
    };
    WfxEventsStrategy.prototype.isFit = function (rule, visibility_rule, whenAggregator, ruleId) {
        return {
            isRecurringEvent: true,
            result: this.addCustomEventListener(rule, visibility_rule, whenAggregator, ruleId)
        };
    };
    return WfxEventsStrategy;
}());


;// CONCATENATED MODULE: ../src/ts/strategy/RoleTagStrategy.ts
var RoleTagStrategy_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var RoleTagStrategy = (function (_super) {
    RoleTagStrategy_extends(RoleTagStrategy, _super);
    function RoleTagStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleTagStrategy.prototype.getType = function () {
        return "role_tag";
    };
    RoleTagStrategy.prototype.getLeft = function (rule) {
        var _a;
        return ((_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a._wfx_get_role_tags()) || [];
    };
    RoleTagStrategy.prototype.getRight = function (rule) {
        return rule.op4;
    };
    RoleTagStrategy.prototype.exists = function (leftValue, rightValue) {
        var hasValidRole = false;
        if (!rightValue) {
            return hasValidRole;
        }
        if (leftValue && leftValue.length > 0) {
            var selectedRoleTags = JSON.parse(rightValue);
            if (selectedRoleTags.length) {
                hasValidRole = selectedRoleTags.some(function (role_tag) { return leftValue.includes(role_tag); });
            }
        }
        return hasValidRole;
    };
    return RoleTagStrategy;
}(BooleanStrategy));


;// CONCATENATED MODULE: ../src/ts/strategy/CohortsStrategy.ts



var CohortsStategy = (function () {
    function CohortsStategy() {
        this.cohorts = [];
    }
    CohortsStategy.prototype.getType = function () {
        return "cohorts";
    };
    CohortsStategy.prototype.getLeft = function (_rule) {
        return this.cohorts;
    };
    CohortsStategy.prototype.getRight = function (_rule) {
        return (_rule === null || _rule === void 0 ? void 0 : _rule.op2) || '';
    };
    CohortsStategy.prototype.isFit = function (rule) {
        return {
            isRecurringEvent: false,
            result: this.evaluate(rule)
        };
    };
    CohortsStategy.prototype.evaluate = function (rule) {
        var _this = this;
        var rejectAccess = null;
        var callback = {
            onSuccess: function (event) { },
            onFailure: function (err) { }
        };
        var cancellablePromiseData = cancellablePromise(new Promise(function (resolve, reject) {
            rejectAccess = reject;
            if (_this.cohorts.length === 0) {
                _this.fetchCohorts(callback);
            }
            else {
                if (_this.compare(rule)) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            }
            callback.onSuccess = function (data) {
                _this.cohorts = data;
                if (_this.compare(rule)) {
                    resolve(true);
                }
                else {
                    reject(false);
                }
            };
            callback.onFailure = function (err) {
            };
        }));
        cancellablePromiseData.cancel = rejectAccess;
        return cancellablePromiseData;
    };
    CohortsStategy.prototype.exists = function (leftValue, _rightValue) {
        return leftValue.indexOf(_rightValue) !== -1;
    };
    CohortsStategy.prototype.compare = function (rule) {
        var o1 = this.getLeft(rule);
        var o2 = this.getRight(rule);
        switch (rule.operator) {
            case Operators.BELONG_TO:
                return this.exists(o1, o2);
            case Operators.DO_NOT_BELONG_TO:
                return !this.exists(o1, o2);
        }
        return false;
    };
    CohortsStategy.prototype.fetchCohorts = function (callback) {
        getWfxNamespaceRef()._wfx_fetch_cohorts(callback);
    };
    return CohortsStategy;
}());


;// CONCATENATED MODULE: ../src/ts/evaluateStrategies/initStrategies.ts


































var Strategies = {
    BooleanStrategies: new WfxMap(),
    SchedulingStrategies: new WfxMap(),
    WindowVariableStrategies: new WfxMap(),
    AsyncStrategies: new WfxMap()
};
var intiStrategies = function () {
    var all_flow_rule = new AllFlowsStrategy();
    var all_smart_tip_rule = new AllSmartTipsStrategy();
    var all_pages_rule = new AllPagesStrategy();
    var app_state__rule = new AppStateStrategy();
    var cookie_rule = new CookieStrategy();
    var date_rule = new DateStrategy();
    var element_rule = new ElementStrategy();
    var end_time_rule = new EndTimeStrategy();
    var ent_attr_rule = new EntAttributeStrategy();
    var flow_rule = new FlowStrategy();
    var function_rule = new FunctionStrategy();
    var hash_rule = new HashStrategy();
    var hostname_rule = new HostnameStrategy();
    var inner_text_rule = new InnerTextStrategy();
    var local_storage_rule = new LocalStorageStrategy();
    var pagetag_rule = new PagetagStrategy();
    var path_rule = new PathStrategy();
    var popup_segment_rule = new PopupSegmentStrategy;
    var query_rule = new QueryStrategy();
    var sfsf_object_rule = new SalesfoceObjectStrategy();
    var session_storage_rule = new SessionStorageStrategy();
    var smart_tip_rule = new SmartTipStrategy();
    var start_time_rule = new StartTimeStrategy();
    var survey_segment_rule = new SurveySegmentStrategy();
    var tasklist_segment_rule = new TaskListSegmentStrategy();
    var title_rule = new TitleStrategy();
    var url_rule = new UrlStrategy();
    var user_action_rule = new UserActionStrategy();
    var user_attr_rule = new UserAttributeStrategy();
    var wfx_events_rule = new WfxEventsStrategy();
    var window_variable_rule = new WindowVariableStrategy();
    var roletag_rule = new RoleTagStrategy();
    var cohorts_rule = new CohortsStategy();
    var booleanStrategies = [all_flow_rule, all_smart_tip_rule, all_pages_rule, cookie_rule, date_rule,
        element_rule, flow_rule, function_rule, hash_rule, hostname_rule, inner_text_rule, local_storage_rule,
        pagetag_rule, path_rule, popup_segment_rule, query_rule, session_storage_rule, smart_tip_rule, survey_segment_rule,
        tasklist_segment_rule, title_rule, url_rule, roletag_rule];
    var schedulingStrategies = [end_time_rule, start_time_rule];
    var windowVariableStrategies = [window_variable_rule, sfsf_object_rule];
    var asyncStrategies = [app_state__rule, wfx_events_rule, user_attr_rule, ent_attr_rule, cohorts_rule, user_action_rule];
    booleanStrategies.forEach(function (strategy) { return Strategies.BooleanStrategies.set(strategy.getType(), strategy); });
    schedulingStrategies.forEach(function (strategy) { return Strategies.SchedulingStrategies.set(strategy.getType(), strategy); });
    windowVariableStrategies.forEach(function (strategy) { return Strategies.WindowVariableStrategies.set(strategy.getType(), strategy); });
    asyncStrategies.forEach(function (strategy) { return Strategies.AsyncStrategies.set(strategy.getType(), strategy); });
};

;// CONCATENATED MODULE: ../src/ts/evaluateStrategies/EvaluateStrategyForConditions.ts



var evaluateConditionBasedOnStrategy = function (condition, visibility_rule, whenAggregator, ruleId) {
    var BooleanStrategies = Strategies.BooleanStrategies, SchedulingStrategies = Strategies.SchedulingStrategies, WindowVariableStrategies = Strategies.WindowVariableStrategies, AsyncStrategies = Strategies.AsyncStrategies;
    var isAsync = false;
    var isRecurringEvent = false;
    var booleanStrategy = BooleanStrategies.get(condition.type);
    var widgetType = getSegmentType(visibility_rule);
    if (booleanStrategy) {
        var leftValue = booleanStrategy.getLeft(condition);
        var rightValue = booleanStrategy.getRight(condition);
        var result = booleanStrategy.exists(leftValue, rightValue);
        if (result) {
            var isFit = booleanStrategy.isFit(condition, null);
            if (whenAggregator && visibility_rule.associated_segment_id in whenAggregator) {
                setAggregator(visibility_rule, whenAggregator, ruleId, isFit);
            }
            Console.debug(widgetType, "Result is ".concat(isFit, " for this condition: "), condition);
            return {
                isAsync: isAsync,
                result: Promise.resolve(isFit),
                isRecurringEvent: false
            };
        }
    }
    var schedulingStrategy = SchedulingStrategies.get(condition.type);
    if (schedulingStrategy) {
        var isFit = schedulingStrategy.isFit(condition);
        Console.debug(widgetType, "Result is ".concat(isFit, " for this condition: "), condition);
        if (whenAggregator && visibility_rule.associated_segment_id in whenAggregator) {
            setAggregator(visibility_rule, whenAggregator, ruleId, isFit);
        }
        return {
            isAsync: isAsync,
            result: Promise.resolve(isFit),
            isRecurringEvent: false
        };
    }
    var windowVariableStrategy = WindowVariableStrategies.get(condition.type);
    if (windowVariableStrategy) {
        var leftValue = windowVariableStrategy.getLeft(condition);
        var result = windowVariableStrategy.exists(leftValue);
        if (result) {
            var isFit = windowVariableStrategy.isFit(condition, null);
            if (whenAggregator && visibility_rule.associated_segment_id in whenAggregator) {
                setAggregator(visibility_rule, whenAggregator, ruleId, isFit);
            }
            return {
                isAsync: isAsync,
                result: Promise.resolve(isFit),
                isRecurringEvent: true
            };
        }
    }
    var asyncStrategy = AsyncStrategies.get(condition.type);
    if (asyncStrategy) {
        var asyncResult = asyncStrategy.isFit(condition, visibility_rule, whenAggregator, ruleId);
        Console.debug(widgetType, "Condition is still being evaluated:", condition);
        return {
            isAsync: true,
            result: asyncResult.result,
            isRecurringEvent: asyncResult.isRecurringEvent
        };
    }
    Console.debug(widgetType, "None of the valid  Strategy :: ".concat(condition.type, ":"), { condition: condition, strategy: null });
    return {
        isAsync: isAsync,
        result: Promise.resolve(false),
        isRecurringEvent: isRecurringEvent
    };
};

;// CONCATENATED MODULE: ../src/ts/evaluateStrategies/EvaluateSegments.ts
var EvaluateSegments_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};










var allRules = {};
var whenAggregator = {};
var previousState = {};
var evaluateAllClauseForSegments = function (visibility_rules, isAsyncOnlyEvalNeeded) {
    var _a, _b;
    var segments = JSON.parse(RuleEngine_$wnd.sessionStorage.getItem(visibility_rules[0].ent_id + DELIMITER + WFX_SEGMENT_EVAL_RESULT) || '{}');
    var widgetType = getSegmentType(visibility_rules[0]);
    var segmentId = (_a = visibility_rules[0]) === null || _a === void 0 ? void 0 : _a.associated_segment_id;
    var segmentName = (_b = visibility_rules[0]) === null || _b === void 0 ? void 0 : _b.associated_segment_name;
    Console.debug(widgetType, "List of visibility rules to be evaluated for a ".concat(widgetType, " with name: ").concat(segmentName, ", segment id:").concat(segmentId, " :"), visibility_rules);
    previousState = {};
    var finalOutput = visibility_rules === null || visibility_rules === void 0 ? void 0 : visibility_rules.map(function (visibility_rule) {
        if (visibility_rule.associated_segment_id in segments) {
            var shouldEval = evalWhereAndWho(visibility_rule);
            var toReturnPromise = shouldEval ? Promise.resolve(shouldEval) : Promise.reject(shouldEval);
            return {
                promise: toReturnPromise,
                visibility_id: visibility_rule.visibility_id,
                is_async: false,
                is_recurring_event: false,
                update_last_modified_time: true
            };
        }
        if (isAsyncOnlyEvalNeeded) {
            var shouldEvalSegment = canEvalVisibilityRule(getConditionTypeToParse(visibility_rule, ConditionType.WHEN_START));
            if (!shouldEvalSegment) {
                return {
                    promise: Promise.reject(false),
                    visibility_id: visibility_rule.visibility_id,
                    is_async: false,
                    is_recurring_event: false,
                };
            }
        }
        allRules["".concat(visibility_rule.associated_segment_id)] = visibility_rule;
        whenAggregator["".concat(visibility_rule.associated_segment_id)] = {};
        var wherePromisesToResolve = createAndBasedPromise(visibility_rule, ConditionType.WHERE);
        var whoPromisesToResolve = createAndBasedPromise(visibility_rule, ConditionType.WHO);
        var whenEndPromisesToResolve = createAndBasedPromise(visibility_rule, ConditionType.WHEN_END);
        var whenStartPromisesToResolve = createAndBasedPromise(visibility_rule, ConditionType.WHEN_START, whenAggregator);
        var visibilityRulePromise = Promise.all(whenEndPromisesToResolve)
            .then(function () { return Promise.all(whenStartPromisesToResolve); })
            .then(function () { return Promise.all(wherePromisesToResolve); })
            .then(function () { return Promise.all(whoPromisesToResolve); })
            .then(function (result) { return result; });
        visibilityRulePromise.catch(function (err) {
            Console.debug(widgetType, "Segment evaluation has failed for this ".concat(widgetType, " with name: ").concat(segmentName, " and ID: ").concat(segmentId, " ,\n                beacuse this ").concat(err.conditionType, " condition is failed"), err);
            return err;
        });
        var cachedData = createCache(visibility_rule, visibilityRulePromise);
        cachedData.get(visibility_rule.visibility_id).promise.catch(function (err) { return err; });
        var visibilityPromiseObject = {
            promise: cachedData.get(visibility_rule.visibility_id).promise,
            visibility_id: visibility_rule.visibility_id,
            is_async: visibility_rule.isAsync,
            is_recurring_event: visibility_rule.isRecurringEvent,
            total_visibility_condition_count: visibility_rule.total_visibility_condition_count
        };
        return visibilityPromiseObject;
    });
    Console.debug(widgetType, "Final Promise of visibility rules to be evaluated for a segment with name: ".concat(segmentName, " segment id:").concat(segmentId, " :"), finalOutput);
    return finalOutput;
};
var canEvalVisibilityRule = function (conditions) {
    var e_1, _a, e_2, _b;
    var canEval = false;
    try {
        for (var conditions_1 = EvaluateSegments_values(conditions), conditions_1_1 = conditions_1.next(); !conditions_1_1.done; conditions_1_1 = conditions_1.next()) {
            var andCondition = conditions_1_1.value;
            try {
                for (var andCondition_1 = (e_2 = void 0, EvaluateSegments_values(andCondition)), andCondition_1_1 = andCondition_1.next(); !andCondition_1_1.done; andCondition_1_1 = andCondition_1.next()) {
                    var orCondition = andCondition_1_1.value;
                    if (Strategies.AsyncStrategies.get(orCondition.type) != null) {
                        canEval = true;
                        break;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (andCondition_1_1 && !andCondition_1_1.done && (_b = andCondition_1.return)) _b.call(andCondition_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (canEval) {
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (conditions_1_1 && !conditions_1_1.done && (_a = conditions_1.return)) _a.call(conditions_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return canEval;
};
var createOrBasedPromise = function (conditionType, orCondition, visibility_rule, whenAggregator, ruleId) {
    return new Promise(function (resolve, reject) {
        var evaluatePromiseObject = evaluateConditionBasedOnStrategy(orCondition, visibility_rule, whenAggregator, ruleId);
        var evaluatePromise = evaluatePromiseObject.result;
        if (!(visibility_rule === null || visibility_rule === void 0 ? void 0 : visibility_rule.reference_or_promises)) {
            visibility_rule.reference_or_promises = [];
        }
        visibility_rule.reference_or_promises.push(evaluatePromiseObject);
        visibility_rule.isAsync = visibility_rule.reference_or_promises.some(function (promiseObject) { return promiseObject.isAsync; });
        visibility_rule.isRecurringEvent = visibility_rule.reference_or_promises.some(function (promiseObject) { return promiseObject.isRecurringEvent; });
        visibility_rule.total_visibility_condition_count = visibility_rule.reference_or_promises.length;
        evaluatePromise.then(function (isValid) {
            if (isValid) {
                visibility_rule.evaluated_visibility_condition_count = (visibility_rule.evaluated_visibility_condition_count || 0) + 1;
                resolve({ conditionType: conditionType, visibility_rule: visibility_rule });
            }
            else {
                reject({ conditionType: conditionType, orCondition: orCondition, visibility_rule: visibility_rule });
            }
        }).catch(function () {
            reject({ conditionType: conditionType, orCondition: orCondition, visibility_rule: visibility_rule });
        });
    });
};
var createAndBasedPromise = function (visibility_rule, conditionType, whenAggregator) {
    var conditionPromiseToResolve = [];
    var widgetType = getSegmentType(visibility_rule);
    var conditionsToParse = getConditionTypeToParse(visibility_rule, conditionType);
    Console.debugOn(widgetType, "Visibility rule ".concat(conditionType));
    Console.debug(widgetType, "Conditions: ", conditionsToParse);
    var isConditionEmpty = conditionsToParse && conditionsToParse.length == 1 && conditionsToParse[0].length == 0;
    if (isConditionEmpty) {
        conditionPromiseToResolve.push(new Promise(function (resolve) { return resolve({ visibility_rule: visibility_rule }); }));
    }
    else {
        if (conditionType === ConditionType.WHEN_START) {
            conditionsToParse === null || conditionsToParse === void 0 ? void 0 : conditionsToParse.forEach(function (andCondition, andIndex) {
                var segmentId = visibility_rule.associated_segment_id;
                var andKey = "AND-".concat(andIndex);
                var conditionLength = (andCondition === null || andCondition === void 0 ? void 0 : andCondition.length) || 0;
                if (!whenAggregator[segmentId]) {
                    whenAggregator[segmentId] = {};
                }
                whenAggregator[segmentId][andKey] = new Array(conditionLength).fill(false);
            });
        }
        conditionPromiseToResolve = conditionsToParse === null || conditionsToParse === void 0 ? void 0 : conditionsToParse.map(function (andCondition, andIndex) {
            var andPromiseArray = andCondition.map(function (orCodition, orIndex) {
                return createOrBasedPromise(conditionType, orCodition, visibility_rule, whenAggregator, "".concat(andIndex, ".").concat(orIndex))
                    .then(function (result) {
                    return result;
                });
            });
            var andPromise = anyPromise(andPromiseArray)
                .then(function (result) {
                return result;
            });
            return andPromise;
        });
    }
    Console.debugOff(widgetType);
    return conditionPromiseToResolve;
};
var createCache = function (visibility_rule, visibilityPromise) {
    VisibilityRulesById.set(visibility_rule.visibility_id, {
        visibilityRule: visibility_rule,
        promise: visibilityPromise
    });
    return VisibilityRulesById;
};
var purgePendingRulesVisibilityRules = function () {
    VisibilityRulesById === null || VisibilityRulesById === void 0 ? void 0 : VisibilityRulesById.forEach(function (rule, key) {
        var _a, _b;
        (_b = (_a = rule === null || rule === void 0 ? void 0 : rule.visibilityRule) === null || _a === void 0 ? void 0 : _a.reference_or_promises) === null || _b === void 0 ? void 0 : _b.forEach(function (orPromise) {
            var _a, _b;
            if ((_a = orPromise === null || orPromise === void 0 ? void 0 : orPromise.result) === null || _a === void 0 ? void 0 : _a.isPending) {
                (_b = orPromise === null || orPromise === void 0 ? void 0 : orPromise.result) === null || _b === void 0 ? void 0 : _b.cancel();
            }
        });
        VisibilityRulesById === null || VisibilityRulesById === void 0 ? void 0 : VisibilityRulesById.delete(key);
    });
};
var getConditionTypeToParse = function (visibility_rule, conditionType) {
    var conditionsToParse = [];
    switch (conditionType) {
        case ConditionType.WHERE:
            conditionsToParse = visibility_rule === null || visibility_rule === void 0 ? void 0 : visibility_rule.where_conditions;
            break;
        case ConditionType.WHO:
            conditionsToParse = visibility_rule === null || visibility_rule === void 0 ? void 0 : visibility_rule.who_conditions;
            break;
        case ConditionType.WHEN_END:
            conditionsToParse = visibility_rule === null || visibility_rule === void 0 ? void 0 : visibility_rule.when_end_conditions;
            break;
        case ConditionType.WHEN_START:
            conditionsToParse = visibility_rule === null || visibility_rule === void 0 ? void 0 : visibility_rule.when_start_conditions;
            break;
    }
    return conditionsToParse;
};
var invokeCustomEventCallback = function (data) {
    var isEventOfInterest = false;
    if (!!(data === null || data === void 0 ? void 0 : data.functionName)) {
        var eventMap = $whatfix_custom_events.get(data.functionName);
        if (eventMap.size > 0) {
            var uniqueId = createUniqueId(data === null || data === void 0 ? void 0 : data.id, data === null || data === void 0 ? void 0 : data.step);
            var doesItHaveAnEventOfInterest = eventMap.has(uniqueId);
            if (doesItHaveAnEventOfInterest) {
                var callbackObject_1 = eventMap.get(uniqueId);
                isEventOfInterest = true;
                return {
                    interested: true,
                    payload: data,
                    callback: function () { return callbackObject_1.callback(data); }
                };
            }
        }
    }
    if (!isEventOfInterest) {
        return {
            interested: false,
            payload: data
        };
    }
};
function removeStorageKey(visibilityRule) {
    var segments = JSON.parse(RuleEngine_$wnd.sessionStorage.getItem(visibilityRule.ent_id + DELIMITER + WFX_SEGMENT_EVAL_RESULT) || '{}');
    delete segments[visibilityRule.associated_segment_id];
    RuleEngine_$wnd.sessionStorage.setItem(visibilityRule.ent_id + DELIMITER + WFX_SEGMENT_EVAL_RESULT, JSON.stringify(segments));
}
function evalAndShowWhereAndWho(visibilityRule) {
    var widgetType = getSegmentType(visibilityRule);
    var segmentId = visibilityRule.associated_segment_id;
    var segmentName = visibilityRule === null || visibilityRule === void 0 ? void 0 : visibilityRule.associated_segment_name;
    Console.debugOn(widgetType, "Re-evaluation of rules for ".concat(widgetType, " with name: ").concat(segmentName, " and ID: ").concat(segmentId));
    var wherePromisesToResolve = createAndBasedPromise(visibilityRule, ConditionType.WHERE);
    var whoPromisesToResolve = createAndBasedPromise(visibilityRule, ConditionType.WHO);
    Promise.all(wherePromisesToResolve)
        .then(function () { return Promise.all(whoPromisesToResolve); })
        .then(function () {
        removeStorageKey(visibilityRule);
        Console.debug(widgetType, "For ".concat(widgetType, " with name: ").concat(segmentName, " id: ").concat(segmentId, " all the conditions are valid now, proceeding to show the widget."));
        getWfxNamespaceRef()._wfx_show_widget(segmentId, visibilityRule.associated_segment_type, false);
    })
        .catch(function (err) {
        Console.debug(widgetType, "Segment re-evaluation has failed for this ".concat(widgetType, " with name: ").concat(segmentName, " and ID: ").concat(segmentId, " ,\n            beacuse this ").concat(err.conditionType, " condition is failed"), err);
    });
    Console.debugOff(widgetType);
}
function evalWhereAndWho(visibilityRule) {
    var wherePromisesToResolve = createAndBasedPromise(visibilityRule, ConditionType.WHERE);
    var whoPromisesToResolve = createAndBasedPromise(visibilityRule, ConditionType.WHO);
    Promise.all(wherePromisesToResolve)
        .then(function () { return Promise.all(whoPromisesToResolve); })
        .then(function () {
        removeStorageKey(visibilityRule);
        return true;
    })
        .catch(function (err) {
        removeStorageKey(visibilityRule);
        console.error("An error occurred:", err);
        return false;
    });
    return false;
}

;// CONCATENATED MODULE: ../src/ts/common/ElementUtility.ts
var __read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};






var isMOCallbackRegistered = false;
function findBySelector(document, operator, selector) {
    switch (operator) {
        case "css":
            return findByCssSelector(document, selector);
        case "jquery":
            return findByJQuerySelector(selector);
    }
}
function findByCssSelector(document, selector) {
    return (selector === null || selector === void 0 ? void 0 : selector.indexOf("<=")) !== -1 ? findByShadowSelector(document, selector) : Array.from(document.querySelectorAll(selector));
}
function findByShadowSelector(document, selector) {
    var selectors = selector.split("<=");
    var index = selectors.length - 1;
    var elements = getElementsFromSelector(document, selectors[index], index);
    var _loop_1 = function () {
        var currLevelElems = [];
        elements.forEach(function (elem) {
            var node = elem.shadowRoot;
            var currNodeElems = getElementsFromSelector(node, selectors[index], index);
            currLevelElems.push.apply(currLevelElems, __spreadArray([], __read(currNodeElems), false));
        });
        elements = currLevelElems;
    };
    for (index = index - 1; index >= 0; index--) {
        _loop_1();
    }
    return elements;
}
function getElementsFromSelector(document, selector, index) {
    var elements = Array.from(document.querySelectorAll(selector));
    if (index != 0) {
        elements = filterVisibles(elements);
    }
    return elements;
}
function filterVisibles(elements) {
    var result = [];
    for (var idx = 0; idx < elements.length; idx++) {
        var elem = elements[idx];
        if (elem && elem.shadowRoot) {
            result.push(elem);
        }
    }
    return result;
}
function findElement(type, content) {
    var _a, _b, _c, _d;
    var data = JSON.parse(content);
    var split = data.selector.lastIndexOf("<<");
    if (split !== -1) {
        var selectorElements = findBySelector(RuleEngine_$wnd.document, data.rule.op2, data.selector.substring(split + 2).trim());
        var crossMsgInstance = (_d = (_c = (_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a.WFX) === null || _b === void 0 ? void 0 : _b.CrossMessager) === null || _c === void 0 ? void 0 : _c.Provider) === null || _d === void 0 ? void 0 : _d.getInstance();
        if (selectorElements.length > 0) {
            data.selector = data.selector.substring(0, split);
            crossMsgInstance === null || crossMsgInstance === void 0 ? void 0 : crossMsgInstance.sendMessageToFrame(selectorElements[0], "find_element_ce", JSON.stringify(data));
        }
        else {
            var data_1 = {};
            data_1.evalResult = false;
            data_1.type = data_1.type;
            crossMsgInstance === null || crossMsgInstance === void 0 ? void 0 : crossMsgInstance.sendMessageToTop(data_1.type, JSON.stringify(data_1.evalResult));
        }
    }
    else {
        data.rule.op3 = data.selector.trim();
        var moJson = {};
        moJson.body = RuleEngine_$wnd.document.body;
        moJson.moConfig = ["attributes", "childList", "subtree"];
        moJson.moType = "customization_engine";
        var visibilityRule = {};
        visibilityRule.visibility_id = data.visibility_id;
        initializeMO(moJson, data.rule, visibilityRule, true, data.type, "");
    }
}
function initializeMOWithCancellablePromise(moJson, rule, visibilityRule, ruleId) {
    var resolveAccess = null;
    var rejectAccess = null;
    var cancellablePromiseData = cancellablePromise(new Promise(function (resolve, reject) {
        resolveAccess = resolve;
        rejectAccess = reject;
    }));
    initializeMO(moJson, rule, visibilityRule, false, "", ruleId, resolveAccess, rejectAccess);
    cancellablePromiseData.catch(function () {
    });
    cancellablePromiseData.cancel = rejectAccess;
    return cancellablePromiseData;
}
function initializeMO(moJson, rule, visibilityRule, isIframeBased, listenerType, ruleId, resolveAccess, rejectAccess) {
    var wfxNamespaceRef = getWfxNamespaceRef();
    var mo = new wfxNamespaceRef.WFX.MUTATION.MasterMOWrapper();
    var callback = {
        onSuccess: function (event) { },
    };
    var documentLoadComplete = "complete";
    callback.onSuccess = function (event) {
        getSegmentIdData('elem').forEach(function (rule) {
            findElementAndCheckIfValid(rule.extractedRule, rule.extractedVisibilityRule, false, "", rule.extractedRuleId);
        });
    };
    if (document.readyState == documentLoadComplete) {
        findElementAndCheckIfValid(rule, visibilityRule, isIframeBased, listenerType, ruleId, resolveAccess, rejectAccess);
    }
    if (!isMOCallbackRegistered) {
        mo.addMO(moJson.body, moJson.moConfig, callback, moJson.moType, visibilityRule.visibility_id);
        isMOCallbackRegistered = true;
    }
}
function findElementAndCheckIfValid(rule, visibilityRule, isIframeBased, listenerType, ruleId, resolveAccess, rejectAccess) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    var possibleElements = findBySelector(RuleEngine_$wnd.document, rule.op2, rule.op3);
    var exist = possibleElements && possibleElements.length > 0;
    switch (rule.operator) {
        case Operators.EXISTS:
            if (exist) {
                if (isIframeBased) {
                    var data = {};
                    data.type = listenerType;
                    data.evalResult = true;
                    var crossMsgInstance = (_d = (_c = (_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a.WFX) === null || _b === void 0 ? void 0 : _b.CrossMessager) === null || _c === void 0 ? void 0 : _c.Provider) === null || _d === void 0 ? void 0 : _d.getInstance();
                    crossMsgInstance === null || crossMsgInstance === void 0 ? void 0 : crossMsgInstance.sendMessageToTop(listenerType, JSON.stringify(data));
                }
                else {
                    setAggregator(visibilityRule, whenAggregator, ruleId, true);
                    resolveAccess === null || resolveAccess === void 0 ? void 0 : resolveAccess.resolveAccess(true);
                }
            }
            else {
                setAggregator(visibilityRule, whenAggregator, ruleId, false);
            }
            break;
        case Operators.COMPARE:
            if (exist) {
                var comparisonObject = JSON.parse((rule === null || rule === void 0 ? void 0 : rule.op4) || '{}');
                var attributeName = (comparisonObject === null || comparisonObject === void 0 ? void 0 : comparisonObject.attribute_name) || "";
                var finalValue = comparisonObject.op3 === "element_attribute" ? getAttributeFromElement(possibleElements[0], attributeName) : possibleElements[0].innerText;
                var isEvaluationValid = checkForOperations(rule === null || rule === void 0 ? void 0 : rule.op4, finalValue);
                if (isIframeBased) {
                    var data = {};
                    data.type = listenerType;
                    data.evalResult = isEvaluationValid;
                    var crossMsgInstance = (_h = (_g = (_f = (_e = getWfxNamespaceRef()) === null || _e === void 0 ? void 0 : _e.WFX) === null || _f === void 0 ? void 0 : _f.CrossMessager) === null || _g === void 0 ? void 0 : _g.Provider) === null || _h === void 0 ? void 0 : _h.getInstance();
                    crossMsgInstance === null || crossMsgInstance === void 0 ? void 0 : crossMsgInstance.sendMessageToTop(listenerType, JSON.stringify(data));
                }
                else {
                    if (isEvaluationValid) {
                        setAggregator(visibilityRule, whenAggregator, ruleId, true);
                        resolveAccess === null || resolveAccess === void 0 ? void 0 : resolveAccess.resolveAccess(isEvaluationValid);
                    }
                    else {
                        setAggregator(visibilityRule, whenAggregator, ruleId, false);
                        rejectAccess === null || rejectAccess === void 0 ? void 0 : rejectAccess.rejectAccess(isEvaluationValid);
                    }
                }
            }
            else {
                setAggregator(visibilityRule, whenAggregator, ruleId, false);
            }
            break;
        case Operators.NOT_EXISTS:
            if (!exist) {
                if (isIframeBased) {
                    var data = {};
                    data.type = listenerType;
                    data.evalResult = true;
                    var crossMsgInstance = (_m = (_l = (_k = (_j = getWfxNamespaceRef()) === null || _j === void 0 ? void 0 : _j.WFX) === null || _k === void 0 ? void 0 : _k.CrossMessager) === null || _l === void 0 ? void 0 : _l.Provider) === null || _m === void 0 ? void 0 : _m.getInstance();
                    crossMsgInstance === null || crossMsgInstance === void 0 ? void 0 : crossMsgInstance.sendMessageToTop(listenerType, JSON.stringify(data));
                }
                else {
                    setAggregator(visibilityRule, whenAggregator, ruleId, true);
                    resolveAccess === null || resolveAccess === void 0 ? void 0 : resolveAccess.resolveAccess(true);
                }
            }
            else {
                if (!isIframeBased) {
                    setAggregator(visibilityRule, whenAggregator, ruleId, false);
                }
            }
            break;
    }
}
function compare(operationObject, extractedValue) {
    extractedValue = trimAndLowerCase(extractedValue);
    var ruleValue1 = trimAndLowerCase(operationObject === null || operationObject === void 0 ? void 0 : operationObject.op1);
    var ruleValue2 = trimAndLowerCase(operationObject === null || operationObject === void 0 ? void 0 : operationObject.op2);
    switch (operationObject.operator) {
        case NumberOperator.EQUALS:
        case Operators.EQUALS:
            return ruleValue1 == extractedValue;
        case NumberOperator.NOT_EQUALS:
        case Operators.NOT_EQUALS:
            return ruleValue1 != extractedValue;
        case Operators.CONTAINS:
            return extractedValue.indexOf(ruleValue1) != -1;
        case Operators.DOES_NOT_CONTAIN:
            return extractedValue.indexOf(ruleValue1) == -1;
        case Operators.STARTS_WITH:
            return extractedValue.startsWith(ruleValue1);
        case Operators.ENDS_WITH:
            return extractedValue.endsWith(ruleValue1);
        case Operators.REGEX:
            return extractedValue.match(ruleValue1);
        case Operators.IS_BLANK:
            return extractedValue === "";
        case Operators.IS_NOT_BLANK:
            return extractedValue && extractedValue != "";
        case NumberOperator.GREATER_THAN:
            return extractedValue > ruleValue1;
        case NumberOperator.LESS_THAN:
            return extractedValue < ruleValue1;
        case NumberOperator.BETWEEN:
            if (ruleValue1 && ruleValue2) {
                return extractedValue >= ruleValue1 && extractedValue <= ruleValue2;
            }
            if (ruleValue1) {
                return extractedValue >= ruleValue1;
            }
            if (ruleValue2) {
                return extractedValue <= ruleValue2;
            }
    }
    return false;
}
function compareDate(ruleComparatorObject, extractedValue) {
    extractedValue = trimAndLowerCase(extractedValue);
    var startBoundValue = trimAndLowerCase(ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.op1);
    var endBoundValue = trimAndLowerCase(ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.op2);
    var format = trimAndLowerCase(ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.op4);
    var operator = ruleComparatorObject === null || ruleComparatorObject === void 0 ? void 0 : ruleComparatorObject.operator;
    var extractedValueDate = extractDateFromString(extractedValue, format);
    var startBoundValueDate = new Date(startBoundValue);
    var endBoundValueDate = new Date(endBoundValue);
    if (!extractedValueDate && (!startBoundValueDate || !endBoundValueDate)) {
        return false;
    }
    var extractedValueTime = !!extractedValueDate ? extractedValueDate.getTime() : 0;
    var startBoundValueTime = !!startBoundValueDate ? startBoundValueDate.getTime() : 0;
    var endBoundValueTime = !!endBoundValueDate ? endBoundValueDate.getTime() : 0;
    switch (operator) {
        case DateOperator.ON:
            return extractedValueTime == startBoundValueTime;
        case DateOperator.AFTER:
            return extractedValueTime > startBoundValueTime;
        case DateOperator.BEFORE:
            return extractedValueTime < startBoundValueTime;
        case DateOperator.BETWEEN:
            if (startBoundValueDate && endBoundValueDate) {
                return extractedValueTime >= startBoundValueTime && extractedValueTime <= endBoundValueTime;
            }
            if (startBoundValueDate) {
                return extractedValueTime >= startBoundValueTime;
            }
            if (endBoundValueDate) {
                return extractedValueTime <= endBoundValueTime;
            }
            return;
    }
    return false;
}
function checkForOperations(operationObject, value) {
    operationObject = trimAndLowerCase(operationObject);
    if (!operationObject && operationObject === "") {
        return true;
    }
    var op3Object = JSON.parse(operationObject);
    switch (op3Object.type) {
        case OperationType.TEXT:
        case OperationType.NUMBER:
            return compare(op3Object, value);
        case OperationType.DATE:
            return compareDate(op3Object, value);
    }
    return false;
}
function extractDateFromString(inputString, format) {
    if (!DATE_FORMAT_MAP.hasOwnProperty(format)) {
        return null;
    }
    var dateFormatObject = DATE_FORMAT_MAP[format];
    var match = inputString.match(dateFormatObject.regex);
    if (match) {
        match.shift();
        var day = parseInt(match[dateFormatObject.day]);
        var month = dateFormatObject.getMonthFromName ? MONTH_MAP[match[dateFormatObject.month]] : parseInt(match[dateFormatObject.month]);
        var year = parseInt(match[dateFormatObject.year]);
        var supportedFormat = "".concat(month, "-").concat(day, "-").concat(year);
        return new Date(supportedFormat);
    }
    return null;
}
function findByJQuerySelector(selector) {
    var jQueryNamespace = getDefaultJQueryNamepsace();
    return RuleEngine_$wnd[jQueryNamespace].apply(null, [selector]).toArray();
}
function getDefaultJQueryNamepsace() {
    return RuleEngine_$wnd["$"] ? "$" : (RuleEngine_$wnd["jQuery"] ? "jQuery" : null);
}

;// CONCATENATED MODULE: ../src/ts/common/ElementHandler.ts




var ElementHandler = (function () {
    function ElementHandler() {
    }
    ElementHandler.prototype.findFinalElement = function (elementOperation) {
        var previousElement;
        for (var i = 0; i < elementOperation.length; ++i) {
            var currentElement = this.findCurrentElement(elementOperation[i], previousElement);
            if (currentElement != null && currentElement != undefined) {
                previousElement = currentElement;
            }
            else {
                return null;
            }
        }
        return previousElement;
    };
    ElementHandler.prototype.findCurrentElement = function (elementDefinition, previousElement) {
        var elementFromSelector = previousElement;
        if (elementDefinition.selector) {
            switch (elementDefinition.selector) {
                case "css":
                    elementFromSelector = ExceptionHandler.execute(function () {
                        return previousElement ? previousElement.querySelectorAll(elementDefinition.selector_value)
                            : RuleEngine_$wnd.document.querySelectorAll(elementDefinition.selector_value);
                    });
                    break;
                case "jquery":
                    var jQueryNamespace_1 = getDefaultJQueryNamepsace();
                    elementFromSelector = ExceptionHandler.execute(function () {
                        return RuleEngine_$wnd[jQueryNamespace_1].apply(null, [elementDefinition.selector_value, previousElement]).toArray();
                    });
                    break;
            }
        }
        if (!elementFromSelector || elementFromSelector.length === 0) {
            return null;
        }
        var index = parseInt(elementDefinition.index);
        if (elementDefinition.inner_text) {
            return elementFromSelector[index];
        }
        return elementDefinition.attribute_name ? getAttributeFromElement(elementFromSelector[index], elementDefinition.attribute_name) : elementFromSelector[index].textContent;
    };
    ElementHandler.prototype.findParentElement = function (element, parentCount) {
        for (var i = 0; i < parentCount; ++i) {
            element = element.parentElement;
            if (element == null) {
                return null;
            }
        }
        return element;
    };
    return ElementHandler;
}());


;// CONCATENATED MODULE: ../src/ts/what/fetcher/ElementFetcher.ts
var ElementFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var ElementFetcher = (function (_super) {
    ElementFetcher_extends(ElementFetcher, _super);
    function ElementFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ElementFetcher.prototype.getType = function () {
        return "element";
    };
    ElementFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        var elementHandler = new ElementHandler();
        return elementHandler.findFinalElement(JSON.parse(rule.element_meta));
    };
    return ElementFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/common/PromiseResolver.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var EvaluationProcessState = (function () {
    function EvaluationProcessState() {
        this.isDone = false;
        this.resolver = null;
    }
    return EvaluationProcessState;
}());
var processStates = new WfxMap();
var PROCESS_TYPES;
(function (PROCESS_TYPES) {
    PROCESS_TYPES["LOCALE"] = "locale";
})(PROCESS_TYPES || (PROCESS_TYPES = {}));
function processComplete(type, result) {
    var validProcesses = processStates.get(type);
    validProcesses === null || validProcesses === void 0 ? void 0 : validProcesses.forEach(function (process) {
        if (!process.isDone) {
            process.isDone = true;
            process.resolver(result);
        }
    });
    processStates.delete(type);
}
function localeResolver(waitTime) {
    return __awaiter(this, void 0, void 0, function () {
        var processState, localeProcesses;
        return __generator(this, function (_a) {
            processState = new EvaluationProcessState();
            localeProcesses = processStates.get(PROCESS_TYPES.LOCALE) || [];
            localeProcesses.push(processState);
            processStates.set(PROCESS_TYPES.LOCALE, localeProcesses);
            return [2, new Promise(function (resolve, reject) {
                    processState.resolver = resolve;
                    setTimeout(function () {
                        processComplete(PROCESS_TYPES.LOCALE, false);
                    }, waitTime);
                })];
        });
    });
}

;// CONCATENATED MODULE: ../src/ts/what/action/WfxSetLocaleAction.ts
var WfxSetLocaleAction_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var WfxSetLocaleAction = (function (_super) {
    WfxSetLocaleAction_extends(WfxSetLocaleAction, _super);
    function WfxSetLocaleAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WfxSetLocaleAction.prototype.getType = function () {
        return "set_locale";
    };
    WfxSetLocaleAction.prototype.performAction = function (rule, what, processorResult) {
        Console.debug(rule.rule_type, "performing action for payload: ", rule);
        var oldValue = getLocale();
        persistLocale(what, processorResult);
        processComplete(PROCESS_TYPES.LOCALE, oldValue !== processorResult);
    };
    return WfxSetLocaleAction;
}(Action));


;// CONCATENATED MODULE: ../src/ts/what/fetcher/UrlFetcher.ts
var UrlFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var UrlFetcher = (function (_super) {
    UrlFetcher_extends(UrlFetcher, _super);
    function UrlFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UrlFetcher.prototype.getType = function () {
        return "url";
    };
    UrlFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        return RuleEngine_$wnd.location.href;
    };
    return UrlFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/fetcher/HashFetcher.ts
var HashFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var HashFetcher = (function (_super) {
    HashFetcher_extends(HashFetcher, _super);
    function HashFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HashFetcher.prototype.getType = function () {
        return "hash";
    };
    HashFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        return RuleEngine_$wnd.location.hash;
    };
    return HashFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/fetcher/HostnameFetcher.ts
var HostnameFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var HostnameFetcher = (function (_super) {
    HostnameFetcher_extends(HostnameFetcher, _super);
    function HostnameFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HostnameFetcher.prototype.getType = function () {
        return "hostname";
    };
    HostnameFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        return RuleEngine_$wnd.location.hostname;
    };
    return HostnameFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/fetcher/PathFetcher.ts
var PathFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var PathFetcher = (function (_super) {
    PathFetcher_extends(PathFetcher, _super);
    function PathFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PathFetcher.prototype.getType = function () {
        return "path";
    };
    PathFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        return RuleEngine_$wnd.location.pathname;
    };
    return PathFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/fetcher/QueryFetcher.ts
var QueryFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var QueryFetcher = (function (_super) {
    QueryFetcher_extends(QueryFetcher, _super);
    function QueryFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    QueryFetcher.prototype.getType = function () {
        return "query";
    };
    QueryFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        return RuleEngine_$wnd.location.search;
    };
    return QueryFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/when/TimerFactory.ts
var TimerFactory_assign = (undefined && undefined.__assign) || function () {
    TimerFactory_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return TimerFactory_assign.apply(this, arguments);
};





var REGISTERED_APPLICATION_EVENT = new WfxMap();
var timeoutId;
var ruleAttempts = 0;
function destroyWhen(whatId) {
    Console.debug(LogCategory.COMMON, "Destroying What block with id: ".concat(whatId));
    REGISTERED_APPLICATION_EVENT.delete(whatId);
    if (REGISTERED_APPLICATION_EVENT.size == 0) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
}
function registerWhen(whatId, whenWithWhat) {
    registerWhenInTimer(whatId, whenWithWhat);
}
function registerWhenInTimer(whatId, whenWithWhat) {
    Console.debug(LogCategory.COMMON, "Registering what block in timer with id: " + whatId + " and payload: " + whenWithWhat);
    var obj = TimerFactory_assign(TimerFactory_assign({}, whenWithWhat), { retry: 17, lastRun: 0, retry_interval: 300 });
    REGISTERED_APPLICATION_EVENT.set(whatId, obj);
    if (!timeoutId) {
        timeoutId = setTimeout(fire, 10);
    }
}
function fire() {
    var currentTime = new Date().getTime();
    ruleAttempts++;
    REGISTERED_APPLICATION_EVENT.forEach(function (value, key) {
        var rule_type = value.what[value.what.length - 1].rule_type;
        if (currentTime - value.lastRun < value.retry_interval) {
            ruleAttempts--;
            return;
        }
        Console.debugOn(rule_type, "Executing what block attempt no: ".concat(ruleAttempts));
        value.lastRun = currentTime;
        if (value.retry > 0) {
            value.retry--;
        }
        var result = checkFiltersAndTriggerWhat(value.what);
        if ((value.retry == 0 && value.retry_interval < 5000)) {
            var newRetryCount = value.retry_interval === 300 ? 30 : 8;
            var newInterval = value.retry_interval === 300 ? 500 : 5000;
            value.retry = newRetryCount;
            value.retry_interval = newInterval;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(fire, value.retry_interval);
            Console.debugOff(rule_type);
            return;
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(fire, value.retry_interval);
        if (value.retry == 0 || result.run) {
            destroyWhen(key);
            checkRuleAndTriggerCallBack(result);
        }
        Console.debugOff(rule_type);
    });
}

;// CONCATENATED MODULE: ../src/ts/when/WhenFactory.ts



















var WhenFactory_WHEN = new WfxMap();
var WHATFIX_EVENTS_RULES = new WfxMap();
var CUSTOM_EVENTS_RULES = new WfxMap();
var APPLICATION_EVENTS_RULES = new WfxMap();
function initWhenFactory() {
    var local_storage_rule = new LocalStorageStrategy();
    var cookie_rule = new CookieStrategy();
    var session_storage_rule = new SessionStorageStrategy();
    var window_variable_rule = new WindowVariableStrategy();
    var element_rule = new ElementStrategy();
    var inner_text_rule = new InnerTextStrategy();
    var url_rule = new UrlStrategy();
    var path_rule = new PathStrategy();
    var hash_rule = new HashStrategy();
    var query_rule = new QueryStrategy();
    var hostname_rule = new HostnameStrategy();
    var function_rule = new FunctionStrategy();
    var when_rules = [url_rule, local_storage_rule, cookie_rule, session_storage_rule, window_variable_rule, path_rule, element_rule,
        hash_rule, query_rule, hostname_rule, function_rule, inner_text_rule];
    initStrategyMap(when_rules, WhenFactory_WHEN);
}
function initValidRules(validRules, rulesToDestroy) {
    Console.debug(LogCategory.COMMON, "Initialising the valid rules...");
    rulesToDestroy.forEach(function (rule) {
        for (var i = 1; i <= rule.total_whats; ++i) {
            var keyName = "what_" + i + "_id";
            APPLICATION_EVENTS_RULES.delete(rule[keyName]);
            destroyWhen(rule[keyName]);
        }
    });
    if (!validRules.some(isLocaleRule)) {
        Console.debug(LogCategory.LOCALE_RULE, "No locale rule found after evaluating where conditions.");
        processComplete(PROCESS_TYPES.LOCALE, false);
    }
    validRules.forEach(function (rule) {
        Console.debugOn(rule.rule_type, " registering what block");
        Console.debug(rule.rule_type, "Current rule being processed: ", rule);
        var what_sequences = createWhatSequences(rule);
        var applicationEvent = { 'what': what_sequences };
        var keyName = "what_1_id";
        APPLICATION_EVENTS_RULES.set(rule[keyName], applicationEvent);
        registerWhenBasedOnType(rule[keyName], applicationEvent);
        Console.debugOff(rule.rule_type);
    });
}
function registerWhenBasedOnType(what_id, whenWithWhat) {
    registerWhen(what_id, whenWithWhat);
}
function checkFiltersAndTriggerWhat(what, data) {
    var result = evaluateWhatSequences(what);
    return { run: result.run, response: result.response, rule_type: result.rule_type };
}
function invokeWhatfixCallback(data) {
    var whensWithWhat = WHATFIX_EVENTS_RULES.get(data.name);
    if (whensWithWhat) {
        for (var i = 0; i < whensWithWhat.length; ++i) {
            var result = checkFiltersAndTriggerWhat(whensWithWhat[i].what, data);
            if (result.run) {
                return result;
            }
        }
    }
    return null;
}
function invokeCustomCallback(event) {
    var whensWithWhat = CUSTOM_EVENTS_RULES.get(event.name);
    whensWithWhat.forEach(function (e) {
        checkFiltersAndTriggerWhat(e.what);
    });
}

;// CONCATENATED MODULE: ../src/ts/what/fetcher/CookieFetcher.ts
var CookieFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var CookieFetcher = (function (_super) {
    CookieFetcher_extends(CookieFetcher, _super);
    function CookieFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CookieFetcher.prototype.getType = function () {
        return "cookie";
    };
    CookieFetcher.prototype.fetchValue = function (rule) {
        Console.debug(rule.rule_type, "Fetching data for payload: ", rule);
        var cookies = RuleEngine_$wnd.document.cookie.split(";");
        for (var i = 0; i < cookies.length; ++i) {
            var cookiePair = cookies[i].split("=");
            if (rule.op1 == cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    };
    return CookieFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/fetcher/InnerTextFetcher.ts
var InnerTextFetcher_extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var InnerTextFetcher = (function (_super) {
    InnerTextFetcher_extends(InnerTextFetcher, _super);
    function InnerTextFetcher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InnerTextFetcher.prototype.getType = function () {
        return "inner_text";
    };
    InnerTextFetcher.prototype.fetchValue = function (rule) {
        var elementHandler = new ElementHandler();
        var finalElement = elementHandler.findFinalElement(JSON.parse(rule.element_meta));
        if (typeof finalElement === 'string' || finalElement instanceof String) {
            return finalElement;
        }
        return finalElement.textContent;
    };
    return InnerTextFetcher;
}(Fetcher));


;// CONCATENATED MODULE: ../src/ts/what/WhatFactory.ts
var WhatFactory_assign = (undefined && undefined.__assign) || function () {
    WhatFactory_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return WhatFactory_assign.apply(this, arguments);
};
var WhatFactory_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
























var WHAT_FETCHERS = new WfxMap();
var WHAT_PROCESSORS = new WfxMap();
var WHAT_ACTIONS = new WfxMap();
var WhatFactory_WHAT_REUSE_MAP = new WfxMap();
var CURRENT_WHAT_SEQUENCE = 1;
function initWhatFactory() {
    var local_storage_fetcher = new LocalStorageFetcher();
    var function_fetcher = new FunctionFetcher();
    var session_storage_fetcher = new SessionStorageFetcher();
    var window_variable_fetcher = new WindowVariableFetcher();
    var element_fetcher = new ElementFetcher();
    var inner_text_fetcher = new InnerTextFetcher();
    var url_fetcher = new UrlFetcher();
    var hash_fetcher = new HashFetcher();
    var hostname_fetcher = new HostnameFetcher();
    var path_fetcher = new PathFetcher();
    var query_fetcher = new QueryFetcher();
    var cookie_fetcher = new CookieFetcher();
    var what_fetchers = [local_storage_fetcher, function_fetcher, session_storage_fetcher, window_variable_fetcher, cookie_fetcher, element_fetcher,
        url_fetcher, hash_fetcher, hostname_fetcher, path_fetcher, query_fetcher, inner_text_fetcher];
    initFetchersMap(what_fetchers, WHAT_FETCHERS);
    var string_processors = new StringProcessor();
    var json_processors = new JsonProcessor();
    var what_processors = [string_processors, json_processors];
    initProcessorsMap(what_processors, WHAT_PROCESSORS);
    var wfx_set_user_action = new WfxSetUserAction();
    var wfx_set_locale_action = new WfxSetLocaleAction();
    var what_actions = [wfx_set_user_action, wfx_set_locale_action];
    initActionsMap(what_actions, WHAT_ACTIONS);
}
function evaluateWhatSequences(what) {
    var e_1, _a;
    var _b, _c;
    var rule_type = what[what.length - 1].rule_type;
    Console.debug(rule_type, "Starting what block evaluation for payload: ", what);
    CURRENT_WHAT_SEQUENCE = 1;
    var _loop_1 = function (what_sequence) {
        var e_2, _d;
        Console.debugOn(rule_type, "Sequence ".concat(CURRENT_WHAT_SEQUENCE));
        Console.debug(rule_type, "Current what block being executed: ", what_sequence);
        action = WHAT_ACTIONS.get(what_sequence.what_action.type);
        condition = WhatFactory_assign(WhatFactory_assign({}, what_sequence.what_fetcher), { operator: "exists" });
        strategy = WhenFactory_WHEN.get(condition.type);
        if (strategy) {
            leftValue = strategy.getLeft(condition);
            result = strategy.exists(leftValue);
            if (!result) {
                Console.debug(rule_type, "This what block fetcher is not valid right now");
                Console.debugOff(rule_type);
                return { value: { run: false, response: FETCHER_NOT_FOUND, rule_type: what_sequence.what_action.type } };
            }
        }
        Console.debug(rule_type, "This what block fetcher is valid. Proceeding to execute what block...");
        if ((!what_sequence.what_fetcher || Object.keys(what_sequence.what_fetcher).length == 0) && ((_b = what_sequence.what_processors) === null || _b === void 0 ? void 0 : _b.length) != 0) {
            Console.debug(rule_type, "Invalid what block with empty fetcher and non-empty processor");
            Console.debugOff(rule_type);
            return { value: { run: true, response: INVALID_WHAT_BLOCK, rule_type: what_sequence.what_action.type } };
        }
        var fetcherResult = void 0;
        fetcher = WHAT_FETCHERS.get(what_sequence.what_fetcher.type);
        if (fetcher) {
            Console.debug(rule_type, "Executing fetcher");
            try {
                fetcherResult = fetcher.fetchValue(WhatFactory_assign(WhatFactory_assign({}, what_sequence.what_fetcher), { rule_type: rule_type }));
            }
            catch (e) {
                fetcherResult = null;
            }
            Console.debug(rule_type, "Fetcher result obtained=".concat(fetcherResult));
        }
        if (Object.keys(what_sequence.what_fetcher).length != 0 && (isNullOrUndefined(fetcherResult) || isNullOrUndefined(fetcher) || fetcherResult === "")) {
            Console.debug(rule_type, "Fetcher returned nothing. Exiting what block execution...");
            Console.debugOff(rule_type);
            return { value: { run: false, response: FETCHER_RESULT_EMPTY, rule_type: what_sequence.what_fetcher.type } };
        }
        var processorResult = fetcherResult;
        WhatFactory_WHAT_REUSE_MAP.set("what".concat(CURRENT_WHAT_SEQUENCE, "_fetcher"), processorResult);
        if (what_sequence.what_processors) {
            var CURRENT_PROCESSOR_SEQUENCE = 1;
            try {
                for (var _e = (e_2 = void 0, WhatFactory_values(what_sequence.what_processors)), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var what_processor = _f.value;
                    processor = WHAT_PROCESSORS.get(what_processor.type);
                    if (processor) {
                        Console.debug(rule_type, "Executing processor ".concat(CURRENT_PROCESSOR_SEQUENCE));
                        processorResult = processor.doProcess(WhatFactory_assign(WhatFactory_assign({}, what_processor), { rule_type: rule_type }), processorResult);
                        if (processorResult === null || processorResult === undefined) {
                            Console.debug(rule_type, "Invalid processor result");
                            break;
                        }
                        else {
                            Console.debug(rule_type, "Processor ".concat(CURRENT_PROCESSOR_SEQUENCE, " result obtained=").concat(processorResult));
                        }
                    }
                    WhatFactory_WHAT_REUSE_MAP.set("what".concat(CURRENT_WHAT_SEQUENCE, "_processor").concat(CURRENT_PROCESSOR_SEQUENCE), processorResult);
                    CURRENT_PROCESSOR_SEQUENCE++;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        if (processorResult === null || processorResult === undefined) {
            Console.debugOff(rule_type);
            return { value: { run: true, response: INVALID_PROCESSOR_RESULT, rule_type: what_sequence.what_action.type } };
        }
        else {
            Console.debug(rule_type, "Final processed value obtained=".concat(processorResult));
        }
        WhatFactory_WHAT_REUSE_MAP.set("what".concat(CURRENT_WHAT_SEQUENCE, "_finalProcessor"), processorResult);
        if (action && CURRENT_WHAT_SEQUENCE === what.length) {
            if (what_sequence.variable_map) {
                var mappedResult = ((_c = what_sequence.variable_map.find(function (item) { return item.op1 === processorResult; })) === null || _c === void 0 ? void 0 : _c.op2) || null;
                if (mappedResult) {
                    Console.debug(rule_type, "Mapping the result ".concat(processorResult, " to ").concat(mappedResult));
                    processorResult = mappedResult;
                }
            }
            Console.debug(rule_type, "Performing action: ".concat(what_sequence.what_action, " with result: ").concat(processorResult));
            action.performAction(WhatFactory_assign(WhatFactory_assign({}, what_sequence.what_action), { rule_type: rule_type }), what_sequence, processorResult);
        }
        CURRENT_WHAT_SEQUENCE++;
        Console.debugOff(rule_type);
    };
    var action, condition, strategy, leftValue, result, fetcher, processor;
    try {
        for (var what_1 = WhatFactory_values(what), what_1_1 = what_1.next(); !what_1_1.done; what_1_1 = what_1.next()) {
            var what_sequence = what_1_1.value;
            var state_1 = _loop_1(what_sequence);
            if (typeof state_1 === "object")
                return state_1.value;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (what_1_1 && !what_1_1.done && (_a = what_1.return)) _a.call(what_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return { run: true, response: RULE_SUCCESS, rule_type: what[what.length - 1].what_action.type };
}
function isNullOrUndefined(object) {
    return object === null || object === undefined;
}

;// CONCATENATED MODULE: ../src/ts/common/utility.ts
var utility_assign = (undefined && undefined.__assign) || function () {
    utility_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return utility_assign.apply(this, arguments);
};
var utility_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var utility_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var utility_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};






var localeValue;
function initStrategyMap(startegies, strategyMap) {
    startegies.forEach(function (strategy) {
        strategyMap.set(strategy.getType(), strategy);
    });
}
function initFetchersMap(fetchers, fetcherMap) {
    fetchers.forEach(function (fetcher) {
        fetcherMap.set(fetcher.getType(), fetcher);
    });
}
function initProcessorsMap(processors, processorMap) {
    processors.forEach(function (processor) {
        processorMap.set(processor.getType(), processor);
    });
}
function initActionsMap(actions, actionMap) {
    actions.forEach(function (action) {
        actionMap.set(action.getType(), action);
    });
}
function areFiltersValid(filters, strategyMap, data, rule_type) {
    for (var i = 0; i < filters.length; ++i) {
        if (!isFitForOr(filters[i], strategyMap, data, rule_type)) {
            return false;
        }
    }
    Console.debug(rule_type, "Filters are valid on this page");
    return true;
}
function isFitForOr(byOr, strategyMap, data, rule_type) {
    if (byOr.length == 0) {
        return true;
    }
    for (var i = 0; i < byOr.length; ++i) {
        if (isFit(byOr[i], strategyMap, data)) {
            Console.debug(rule_type, "This filter is valid on this page: ", byOr[i]);
            if (i !== byOr.length - 1) {
                Console.debug(rule_type, "Skipping the rest as this was valid");
            }
            return true;
        }
        else {
            Console.debug(rule_type, "This filter is not valid on this page: ", byOr[i]);
        }
    }
    return false;
}
function isFit(boolStrategy, strategyMap, data) {
    var strategy = strategyMap.get(boolStrategy.type);
    if (strategy) {
        return strategy.isFit(boolStrategy, data);
    }
    return false;
}
function getAttributeFromElement(element, attribute) {
    return element.getAttribute(attribute) !== null && element.getAttribute(attribute) !== undefined ?
        element.getAttribute(attribute) : "";
}
function readFromWindow(input) {
    return readFromJSON(RuleEngine_$wnd, input);
}
function readFromJSON(obj, input) {
    var params = input.split(".");
    if (params && params.length > 0) {
        var winVar = obj[params[0]];
        for (var i = 1; i < params.length; ++i) {
            if (winVar) {
                winVar = winVar[params[i]];
            }
            else {
                break;
            }
        }
        return winVar;
    }
    return null;
}
function setInWindow(key, value) {
    var params = key.split(".");
    if (params && params.length == 1) {
        $wnd[params[0]] = value;
        return;
    }
    else if (params.length > 1) {
        $wnd[params[0]] ? null : $wnd[params[0]] = {};
        var winVar = $wnd[params[0]];
        for (var i = 1; i < params.length - 1; ++i) {
            winVar[params[i]] ? null : winVar[params[i]] = {};
            winVar = winVar[params[i]];
        }
        winVar != null ? winVar[params[params.length - 1]] = value : null;
    }
}
function whatBoundKeys(i) {
    return {
        what_id: WHAT_KEY_PREFIX + i + ID_SUFFIX,
        what_action: WHAT_KEY_PREFIX + i + "_action",
        what_fetcher: WHAT_KEY_PREFIX + i + "_fetcher",
        what_processors: WHAT_KEY_PREFIX + i + "_processors"
    };
}
function createWhatSequences(rule) {
    var whatSequences = [];
    for (var i = 1; i <= rule.total_whats; ++i) {
        var keys = whatBoundKeys(i);
        var obj = {
            "what_id": rule[keys.what_id],
            "what_fetcher": rule[keys.what_fetcher],
            "what_processors": rule[keys.what_processors],
            "what_action": rule[keys.what_action],
            "ent_id": rule["ent_id"],
            "rule_id": rule["rule_id"],
            "version_num": rule["version_num"],
            "variable_map": rule["variable_mapping"],
            "rule_type": rule["rule_type"],
        };
        whatSequences.push(obj);
    }
    return whatSequences;
}
function setInCustomizer(type, processorOutput) {
    var params = type.split(".");
    if (params && params.length > 0) {
        var winVar = $wnd[params[0]] ? $wnd[params[0]] : $wnd["_wfx_settings"];
        for (var i = 1; i < params.length - 1; ++i) {
            winVar[params[i]] ? null : winVar[params[i]] = {};
            winVar = winVar[params[i]];
        }
        winVar != null ? winVar[params[params.length - 1]] = processorOutput : null;
    }
}
function createAndSetCustomizerObject(rule, dataType) {
    var obj = WHAT_REUSE_MAP.get(rule.type);
    if (!obj) {
        obj = {};
    }
    switch (dataType) {
        case "integer":
            obj[rule.op1] = parseInt(rule.op2);
            break;
        case "boolean":
            obj[rule.op1] = rule.op2 == "true";
            break;
        default:
            obj[rule.op1] = rule.op2;
            break;
    }
    setInCustomizer(rule.type, obj);
    WHAT_REUSE_MAP.set(rule.type, obj);
}
function createAndSetCustomizerVariable(value, key) {
    setInCustomizer(key, value);
}
var DELIMITER = "::";
function persistInLocalStorage(what, key, value) {
    var val = what.rule_id + DELIMITER + what.version_num + DELIMITER + value;
    RuleEngine_$wnd.localStorage.setItem(what.ent_id + DELIMITER + key, val);
}
function persistUserID(what, value) {
    var _a, _b, _c;
    userValue.decryptedUser = value;
    var encryptedVal = (_c = (_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a.encrypt) === null || _b === void 0 ? void 0 : _b.call(_a, value)) !== null && _c !== void 0 ? _c : value;
    userValue.encryptedUser = encryptedVal;
    userValue.ruleID = what.rule_id;
    userValue.ruleVersion = what.version_num.toString();
    persistInLocalStorage(what, Constants_USER_ID_KEY_IN_LOCAL_STORAGE, encryptedVal);
}
function persistLocale(what, value) {
    localeValue = value;
    persistInLocalStorage(what, LOCALE_KEY_IN_LOCAL_STORAGE, value);
}
function checkPersistedUserInfo(rule) {
    switch (rule.type) {
        case "set_user":
            var persistedUserInfo = $wnd.localStorage.getItem(USER_ID_KEY_IN_LOCAL_STORAGE);
            if (persistedUserInfo != null && persistedUserInfo != undefined) {
                setInCustomizer("user", persistedUserInfo);
                return true;
            }
            break;
        case "set_user_name":
            var persistedUserNameInfo = $wnd.localStorage.getItem(USER_NAME_KEY_IN_LOCAL_STORAGE);
            if (persistedUserInfo != null && persistedUserInfo != undefined) {
                setInCustomizer("user_name", persistedUserInfo);
                return true;
            }
            break;
    }
    return null;
}
function getLocalStorageValue(key) {
    return RuleEngine_$wnd.localStorage.getItem(key);
}
function getWorkdayDataValue() {
    return RuleEngine_$wnd.localStorage.getItem(WORKDAY_DATA_LOCAL_STORAGE_KEY);
}
function getSessionStorageValue(key) {
    return RuleEngine_$wnd.sessionStorage.getItem(key);
}
function getCookieValue(key) {
    var cookies = RuleEngine_$wnd.document.cookie.split(";");
    for (var i = 0; i < cookies.length; ++i) {
        var cookiePair = cookies[i].split("=");
        if (key == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}
function checkRuleAndTriggerCallBack(result) {
    if (result.rule_type === SET_USER &&
        getWfxNamespaceRef()._wfx_user_detected_status !== null &&
        getWfxNamespaceRef()._wfx_user_detected_status !== undefined) {
        getWfxNamespaceRef()._wfx_user_detected_status(utility_assign({}, result));
    }
}
function isLocaleRule(rule) {
    return rule.rule_type === "locale_rule";
}
function trimAndLowerCase(value, toLowerCase) {
    if (toLowerCase === void 0) { toLowerCase = false; }
    if (!!value && typeof value == 'string') {
        return toLowerCase ? value === null || value === void 0 ? void 0 : value.trim().toLowerCase() : value === null || value === void 0 ? void 0 : value.trim();
    }
    return value;
}
function setAggregator(visibilityRule, whenAggregator, ruleId, flag, isWfxEvents) {
    var widgetType = getSegmentType(visibilityRule);
    var segmentId = visibilityRule.associated_segment_id;
    var segmentName = visibilityRule === null || visibilityRule === void 0 ? void 0 : visibilityRule.associated_segment_name;
    var _a = extractRuleId(ruleId), andIndex = _a.andIndex, orIndex = _a.orIndex;
    var prevResult = whenAggregator[segmentId]["AND-".concat(andIndex)][orIndex] || false;
    whenAggregator[segmentId]["AND-".concat(andIndex)][orIndex] = flag;
    var rule = visibilityRule === null || visibilityRule === void 0 ? void 0 : visibilityRule.when_start_conditions[andIndex][orIndex];
    if (prevResult !== flag) {
        Console.debug(widgetType, "This condition for segmentName: ".concat(segmentName, " segmentId : ").concat(segmentId, " is ").concat(flag, " now :"), rule);
    }
    evalAndShowWidget(whenAggregator, visibilityRule, isWfxEvents);
}
function evalAndShowWidget(whenAggregator, visibilityRule, isWfxEvents) {
    var result = evaluateAggrData(visibilityRule.associated_segment_id, whenAggregator);
    var wasPreviouslyTrue = previousState[visibilityRule.associated_segment_id] === true;
    var wasPreviouslyFalse = previousState[visibilityRule.associated_segment_id] === false;
    var widgetType = getSegmentType(visibilityRule);
    var segmentId = visibilityRule.associated_segment_id;
    var segmentName = visibilityRule === null || visibilityRule === void 0 ? void 0 : visibilityRule.associated_segment_name;
    if (result && (!wasPreviouslyTrue || isWfxEvents)) {
        var segments = JSON.parse(RuleEngine_$wnd.sessionStorage.getItem(visibilityRule.ent_id + DELIMITER + WFX_SEGMENT_EVAL_RESULT) || '{}');
        segments[visibilityRule.associated_segment_id] = true;
        RuleEngine_$wnd.sessionStorage.setItem(visibilityRule.ent_id + DELIMITER + WFX_SEGMENT_EVAL_RESULT, JSON.stringify(segments));
        Console.debug(widgetType, "For ".concat(widgetType, " with name: ").concat(segmentName, " id: ").concat(segmentId, " all when conditions are valid now, proceeding to check where and who."));
        evalAndShowWhereAndWho(visibilityRule);
    }
    else if (!result && (!wasPreviouslyFalse || isWfxEvents)) {
        Console.debug(widgetType, "For ".concat(widgetType, " with name: ").concat(segmentName, " id: ").concat(segmentId, " as when conditions are not valid now, widget is hidden."));
        getWfxNamespaceRef()._wfx_show_widget(visibilityRule.associated_segment_id, visibilityRule.associated_segment_type, true);
    }
    previousState[visibilityRule.associated_segment_id] = result;
}
function extractRuleId(ruleId) {
    var _a = utility_read(ruleId.split('.'), 2), andIndex = _a[0], orIndex = _a[1];
    return {
        andIndex: parseInt(andIndex),
        orIndex: parseInt(orIndex)
    };
}
function evaluateAggrData(associated_segment_id, whenAggregator) {
    var e_1, _a;
    var whenStart = whenAggregator[associated_segment_id];
    for (var andKey in whenStart) {
        var conditions = whenStart[andKey];
        var atLeastOneTrue = false;
        try {
            for (var conditions_1 = (e_1 = void 0, utility_values(conditions)), conditions_1_1 = conditions_1.next(); !conditions_1_1.done; conditions_1_1 = conditions_1.next()) {
                var condition = conditions_1_1.value;
                if (condition) {
                    atLeastOneTrue = true;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (conditions_1_1 && !conditions_1_1.done && (_a = conditions_1.return)) _a.call(conditions_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (!atLeastOneTrue) {
            return false;
        }
    }
    return true;
}
function updateSegmentIdMap(rule, visibility_rule, ruleId) {
    var _a, _b;
    var key;
    switch (rule.op1) {
        case "local_storage":
            key = "ls-".concat(rule.op3);
            break;
        case "session_storage":
            key = "ss-".concat(rule.op3);
            break;
        case "cookies":
            key = "c-".concat(rule.op3);
            break;
        case "variable":
            key = "var-".concat(rule.op3);
            break;
        case "element":
            key = 'elem';
            break;
        case AppSpecificRuleObject.WORKDAY_DATA:
            key = "ls-".concat(WORKDAY_DATA_LOCAL_STORAGE_KEY);
            break;
    }
    var segmentId = "".concat(visibility_rule.associated_segment_id, ".").concat(ruleId);
    if (!((_a = segmentIdMap[key]) === null || _a === void 0 ? void 0 : _a.includes(segmentId))) {
        segmentIdMap[key] = utility_spreadArray(utility_spreadArray([], utility_read(((_b = segmentIdMap[key]) !== null && _b !== void 0 ? _b : [])), false), [segmentId], false);
    }
}
function getSegmentIdData(key) {
    if (key in segmentIdMap) {
        return segmentIdMap[key].map(function (detail) {
            var _a;
            var _b = utility_read(detail.split('.'), 3), segID = _b[0], andIndex = _b[1], orIndex = _b[2];
            var where_conditions = (_a = allRules[segID]) === null || _a === void 0 ? void 0 : _a.when_start_conditions;
            var extractedRule = where_conditions[andIndex][orIndex];
            return {
                extractedRuleId: "".concat(andIndex, ".").concat(orIndex),
                extractedRule: extractedRule,
                extractedVisibilityRule: allRules[segID]
            };
        });
    }
    return undefined;
}
function getSegmentType(extractedVisibilityRule) {
    var segmentType = (extractedVisibilityRule === null || extractedVisibilityRule === void 0 ? void 0 : extractedVisibilityRule.associated_segment_type) || "";
    switch (segmentType) {
        case "la":
            return SegmentType.LAUNCHER;
        case "st":
            return SegmentType.SMART_TIP;
        case "be":
            return SegmentType.BEACON;
        case "popup":
            return SegmentType.POPUP;
        case "survey":
            return SegmentType.SURVEY;
        case "sh":
            return SegmentType.SELF_HELP;
        case "tl":
            return SegmentType.TASK_LIST;
        default:
            return "";
    }
}
function compareNumbers(o1, o2, isFirstOpGreater) {
    var result = false;
    try {
        if (isFirstOpGreater) {
            result = parseFloat(o1) > parseFloat(o2);
        }
        else {
            result = parseFloat(o1) < parseFloat(o2);
        }
    }
    catch (e) {
        result = false;
    }
    return result;
}
function compareDates(o1, o2, isFirstOpGreater) {
    var currentTimestamp = o1;
    var configuredTimestamp = new Date(o2).getTime() + (new Date().getTimezoneOffset() * 60000);
    return isFirstOpGreater ? (currentTimestamp > configuredTimestamp) : (currentTimestamp < configuredTimestamp);
}

;// CONCATENATED MODULE: ../src/ts/where/WhereFactory.ts









var WhereFactory_WHERE = new WfxMap();
function initWhereFactory() {
    var url_rule = new UrlStrategy();
    var path_rule = new PathStrategy();
    var hash_rule = new HashStrategy();
    var query_rule = new QueryStrategy();
    var hostname_rule = new HostnameStrategy();
    var pagetag_rule = new PagetagStrategy();
    var all_pages_rule = new AllPagesStrategy();
    var where_rules = [url_rule, path_rule, hash_rule, query_rule, hostname_rule, pagetag_rule, all_pages_rule];
    initStrategyMap(where_rules, WhereFactory_WHERE);
}
function isValidOnPage(where_conditions, rule_type) {
    return areFiltersValid(where_conditions, WhereFactory_WHERE, null, rule_type);
}

;// CONCATENATED MODULE: ../src/ts/customization-script/ElementJSONUtil.ts
var ElementJSONUtil_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var ElementJSONUtil_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ElementJSONUtil_values = (undefined && undefined.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};


var ElementMap = (function () {
    function ElementMap() {
    }
    ElementMap.createElementJSON = function (element) {
        if (!element) {
            return {};
        }
        var jsonObj = {
            value: element.value,
            offsetHeight: element.offsetHeight,
            offsetWidth: element.offsetWidth,
            attributes: ElementMap.extractAttributes(element),
            innerText: element.innerText,
            tagName: element.tagName,
            classList: ElementJSONUtil_spreadArray([], ElementJSONUtil_read(element.classList), false),
            shadowRoot: element.shadowRoot != null,
            _wfxId: "".concat(Date.now()).concat((++ElementMap.counter)),
        };
        if (['iframe', 'frame', 'frameset'].includes(element.tagName.toLocaleLowerCase())) {
            jsonObj.contentWindow = element.contentWindow !== null;
            jsonObj.contentDocument = element.contentDocument !== null;
        }
        ElementMap.elementIdToElementMap.set(jsonObj._wfxId, element);
        return jsonObj;
    };
    ElementMap.extractAttributes = function (element) {
        var e_1, _a;
        var attributes = {};
        try {
            for (var _b = ElementJSONUtil_values(element.attributes), _c = _b.next(); !_c.done; _c = _b.next()) {
                var attribute = _c.value;
                attributes[attribute.nodeName] = attribute.nodeValue || '';
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return attributes;
    };
    ElementMap.getElementJSON = function (element) {
        return ElementMap.createElementJSON(element);
    };
    ElementMap.getElementJSONList = function (elements) {
        var elementList = [];
        for (var idx = 0; idx < elements.length; idx++) {
            var element = elements[idx];
            elementList.push(ElementMap.createElementJSON(element));
        }
        return elementList;
    };
    ElementMap.optimizeCustomizationEngineMemory = function () {
        if (!Console.isDebugModeOn) {
            ElementMap.elementIdToElementMap.clear();
            ElementMap.counter = 0;
        }
    };
    ElementMap.elementIdToElementMap = new WfxMap();
    ElementMap.counter = 0;
    return ElementMap;
}());


;// CONCATENATED MODULE: ../src/ts/common/Observer.ts



var OBSERVER;
function initObserver() {
    var time = 0;
    var interval = setInterval(function () {
        var _a, _b, _c;
        if ((_c = (_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a.whatfix) === null || _b === void 0 ? void 0 : _b.observer) === null || _c === void 0 ? void 0 : _c.ObserverFactory) {
            OBSERVER = new (getWfxNamespaceRef()).whatfix.observer.ObserverFactory;
            clearInterval(interval);
        }
        else if (time >= 5000) {
            Console.debug(LogCategory.COMMON, 'Could Not load observer');
            clearInterval(interval);
        }
        else {
            time += 200;
        }
    }, 200);
}
var getObserver = function () { return OBSERVER; };
/* harmony default export */ var Observer = (getObserver);

;// CONCATENATED MODULE: ../src/ts/customization-script/CustomizationScriptFunctionsImpl.ts
var CustomizationScriptFunctionsImpl_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var CustomizationScriptFunctionsImpl_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};





var getVariableStore = function (iframeId) {
    var _a, _b;
    if (iframeId) {
        var iframeWindow = getIframeWindow(iframeId);
        if (iframeWindow) {
            try {
                return iframeWindow[getWfxNamespace()] || iframeWindow;
            }
            catch (error) {
                (_a = Observer()) === null || _a === void 0 ? void 0 : _a.debug('CUSTOMIZATION_ENGINE', 'getVariableStore', 'WORKFLOW_ENGINE', "Cannot access cross origin iframe -> | ".concat(error.stack));
                return null;
            }
        }
        (_b = Observer()) === null || _b === void 0 ? void 0 : _b.debug('CUSTOMIZATION_ENGINE', 'getVariableStore', 'WORKFLOW_ENGINE', "No Iframe window exists corresponding to frame id -> ".concat(iframeId));
        return null;
    }
    return getWfxNamespaceRef() || RuleEngine_$wnd;
};
var _wfxLibraryImpl = {
    querySelector: function (selector, iframeId) {
        var _a;
        return ElementMap.getElementJSON(iframeId
            ? (_a = getIframeDocument(iframeId)) === null || _a === void 0 ? void 0 : _a.querySelector(selector)
            : RuleEngine_$wnd.document.querySelector(selector));
    },
    querySelectorAll: function (selector, iframeId) {
        var _a;
        return ElementMap.getElementJSONList(iframeId
            ? (_a = getIframeDocument(iframeId)) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector)
            : RuleEngine_$wnd.document.querySelectorAll(selector));
    },
    nextElementSibling: function (wfxId) {
        var element = ElementMap.elementIdToElementMap.get(wfxId);
        return ElementMap.getElementJSON(element === null || element === void 0 ? void 0 : element.nextElementSibling);
    },
    children: function (wfxId) {
        var element = ElementMap.elementIdToElementMap.get(wfxId);
        return ElementMap.getElementJSONList(element === null || element === void 0 ? void 0 : element.children);
    },
    getElementsByTagName: function (selector, iframeId) {
        var _a;
        return ElementMap.getElementJSONList(iframeId
            ? (_a = getIframeDocument(iframeId)) === null || _a === void 0 ? void 0 : _a.getElementsByTagName(selector)
            : RuleEngine_$wnd.document.getElementsByTagName(selector));
    },
    getElementsByClassName: function (classNames, iframeId) {
        var _a;
        return ElementMap.getElementJSONList(iframeId
            ? (_a = getIframeDocument(iframeId)) === null || _a === void 0 ? void 0 : _a.getElementsByClassName(classNames)
            : RuleEngine_$wnd.document.getElementsByClassName(classNames));
    },
    getBoundingClientRect: function (wfxId) {
        var element = ElementMap.elementIdToElementMap.get(wfxId);
        return (element === null || element === void 0 ? void 0 : element.getBoundingClientRect()) || {};
    },
    contains: function (parentId, childId) {
        var parentElement = ElementMap.elementIdToElementMap.get(parentId);
        var childElement = ElementMap.elementIdToElementMap.get(childId);
        return (parentElement &&
            childElement &&
            (parentElement === childElement || parentElement.contains(childElement)));
    },
    setVariable: function (variableArray, iframeId) {
        var variableStore = getVariableStore(iframeId);
        if (variableStore) {
            Object.assign(variableStore, variableArray);
        }
    },
    setSingleVariable: function (varKey, varValue, iframeId) {
        var variableStore = getVariableStore(iframeId);
        if (variableStore) {
            variableStore[varKey] = varValue;
        }
    },
    getVariable: function (varName, iframeId) {
        var globalWindow = iframeId
            ? getIframeWindow(iframeId)
            : RuleEngine_$wnd;
        var namespaceWindow = iframeId
            ? getIframeWindow(iframeId)[getWfxNamespace()]
            : getWfxNamespaceRef();
        return getVariableByPath(varName.split('.'), globalWindow, namespaceWindow);
    },
    location: function (iframeId) {
        var _a;
        return iframeId ? (_a = getIframeWindow(iframeId)) === null || _a === void 0 ? void 0 : _a.location : RuleEngine_$wnd.location;
    },
    getParentElement: function (elementId) {
        var element = ElementMap.elementIdToElementMap.get(elementId);
        return ElementMap.getElementJSON(element === null || element === void 0 ? void 0 : element.parentElement);
    },
    getFirstChild: function (elementId) {
        var element = ElementMap.elementIdToElementMap.get(elementId);
        return ElementMap.getElementJSON(element === null || element === void 0 ? void 0 : element.firstElementChild);
    },
    getProperties: function (elementId, propertyNames) {
        var element = ElementMap.elementIdToElementMap.get(elementId);
        var propertyMap = {};
        propertyNames.forEach(function (propertyName) {
            propertyMap[propertyName] = element[propertyName];
        });
        return propertyMap;
    },
    setPageVariablesForDefaultApp: function (varArray, iframeId) {
        var variableStore = getVariableStore(iframeId);
        if (variableStore) {
            variableStore._wfx_settings = variableStore._wfx_settings || {};
            variableStore._wfx_settings.page_variables = varArray;
        }
    },
    title: function (iframeId) {
        var _a;
        return iframeId ? (_a = getIframeDocument(iframeId)) === null || _a === void 0 ? void 0 : _a.title : RuleEngine_$wnd.document.title;
    },
    getCurrentActivity: function () {
        var _a;
        return (_a = RuleEngine_$wnd.whatfix) === null || _a === void 0 ? void 0 : _a.getCurrentActivity();
    },
    querySelectorAllWithShadowRoot: function (selector, elementId) {
        var _a;
        var element = ElementMap.elementIdToElementMap.get(elementId);
        return ElementMap.getElementJSONList((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector));
    },
    isLandingPage: function () {
        return RuleEngine_$wnd.isLandingPage();
    },
    getComputedStyle: function (elementId) {
        var element = ElementMap.elementIdToElementMap.get(elementId);
        var computedStyle = RuleEngine_$wnd.getComputedStyle(element);
        var computedStyleJSON = JSON.parse(JSON.stringify(computedStyle));
        return computedStyleJSON;
    },
    getAttributeValuesInSFLightning: function (elementId) {
        var element = ElementMap.elementIdToElementMap.get(elementId);
        var comp = RuleEngine_$wnd.$A.getComponent(element);
        var cvp = comp ? comp.getComponentValueProvider() : null;
        var keys = cvp ? cvp.getDef().getAttributeDefs() : null;
        var values = {};
        if (keys) {
            keys.each(function (key) {
                var _a;
                var val, name = (_a = key === null || key === void 0 ? void 0 : key.getDescriptor()) === null || _a === void 0 ? void 0 : _a.getName();
                val = cvp.get('v.' + name);
                values[name] = val;
            });
        }
        return values;
    },
    getContentForm: function () {
        var _a, _b;
        return (_b = (_a = RuleEngine_$wnd.mx) === null || _a === void 0 ? void 0 : _a.ui) === null || _b === void 0 ? void 0 : _b.getContentForm();
    },
    getContextObjectForAriba: function () {
        if (RuleEngine_$wnd.ariba && RuleEngine_$wnd.ariba.Community && RuleEngine_$wnd.ariba.Community.getCommunityContextObject() &&
            typeof RuleEngine_$wnd.ariba.Community.getCommunityContextObject() === "object" &&
            Object.keys(RuleEngine_$wnd.ariba.Community.getCommunityContextObject()).length > 0) {
            return RuleEngine_$wnd.ariba.Community.getCommunityContextObject();
        }
    },
    getExtActiveTabForHomePage: function () {
        var _a, _b, _c, _d;
        var activeTab = ((_c = (_b = (_a = RuleEngine_$wnd.Ext) === null || _a === void 0 ? void 0 : _a.getCmp('HomePage')) === null || _b === void 0 ? void 0 : _b.inbasketTabs) === null || _c === void 0 ? void 0 : _c.getActiveTab()) || {};
        if (activeTab === null || activeTab === void 0 ? void 0 : activeTab.config) {
            return ({
                config: {
                    title: (_d = activeTab.config) === null || _d === void 0 ? void 0 : _d.tabId
                }
            });
        }
        return activeTab;
    },
    getExtActiveTabForMainTabPanelId: function () {
        var _a, _b, _c, _d, _e, _f;
        var mainTabpanelId = (_b = (_a = RuleEngine_$wnd.VSpace) === null || _a === void 0 ? void 0 : _a.utils) === null || _b === void 0 ? void 0 : _b.MAIN_TABPANEL_ID;
        var activeTab = mainTabpanelId ? (_d = (_c = RuleEngine_$wnd.Ext) === null || _c === void 0 ? void 0 : _c.getCmp(mainTabpanelId)) === null || _d === void 0 ? void 0 : _d.getActiveTab() : {};
        if (activeTab === null || activeTab === void 0 ? void 0 : activeTab.config) {
            return ({
                config: {
                    tabId: (_e = activeTab.config) === null || _e === void 0 ? void 0 : _e.tabId,
                    xtype: (_f = activeTab.config) === null || _f === void 0 ? void 0 : _f.xtype
                }
            });
        }
        return activeTab;
    },
    _wfx_refresh: function () {
        var _a;
        if (typeof RuleEngine_$wnd._wfx_refresh === 'function') {
            (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a._wfx_refresh();
        }
    }
};
function invokeLibraryFunction(type, content) {
    var _a;
    var _b, _c, _d;
    var payload = JSON.parse(content);
    var responseData = { messageId: payload.messageId };
    var stringRes = "";
    try {
        if (payload.namespace !== getWfxNamespace()) {
            return;
        }
        (_b = Observer()) === null || _b === void 0 ? void 0 : _b.debug('CUSTOMIZATION_ENGINE', 'invokeLibraryFunction', 'WORKFLOW_ENGINE', "CE received -> | ".concat(content));
        responseData.result = (_a = _wfxLibraryImpl)[payload.methodName].apply(_a, CustomizationScriptFunctionsImpl_spreadArray([], CustomizationScriptFunctionsImpl_read(payload.args), false));
        stringRes = JSON.stringify(responseData);
    }
    catch (error) {
        responseData.result = "";
        responseData.error = (error === null || error === void 0 ? void 0 : error.message) ? error.message : "Error in processing script function";
        (_c = Observer()) === null || _c === void 0 ? void 0 : _c.error('CUSTOMIZATION_ENGINE', 'invokeLibraryFunction', 'WORKFLOW_ENGINE', error.stack, "Error for data -> | ".concat(JSON.stringify(responseData)));
        stringRes = JSON.stringify(responseData);
    }
    getWfxNamespaceRef().WFX.postMessageToBridge(CUSTOMIZATION_SCRIPT_QUERY_RESULT, stringRes);
    (_d = Observer()) === null || _d === void 0 ? void 0 : _d.debug('CUSTOMIZATION_ENGINE', 'invokeLibraryFunction', 'WORKFLOW_ENGINE', "CE sent -> | ".concat(JSON.stringify(responseData)));
}
function getIframeWindow(iframeId) {
    var iframeElement = iframeId && ElementMap.elementIdToElementMap.get(iframeId);
    return iframeElement === null || iframeElement === void 0 ? void 0 : iframeElement.contentWindow;
}
function getIframeDocument(iframeId) {
    var iframeElement = iframeId && ElementMap.elementIdToElementMap.get(iframeId);
    return iframeElement === null || iframeElement === void 0 ? void 0 : iframeElement.contentDocument;
}
function getVariableByPath(params, globalWindow, namespaceWindow) {
    var _a;
    if (params && params.length > 0) {
        var varValue = "";
        if (namespaceWindow[params[0]]) {
            varValue = readFromJSON(namespaceWindow, params === null || params === void 0 ? void 0 : params.join('.'));
        }
        else if (globalWindow[params[0]] && globalWindow[params[0]].value) {
            varValue = readFromJSON(globalWindow[params[0]].value, (_a = params === null || params === void 0 ? void 0 : params.slice(1)) === null || _a === void 0 ? void 0 : _a.join('.'));
        }
        if (!varValue) {
            varValue = readFromJSON(globalWindow, params === null || params === void 0 ? void 0 : params.join('.'));
        }
        return varValue;
    }
    return "";
}

;// CONCATENATED MODULE: ../src/ts/rules-engine/initListeners.ts



var initListeners = function () {
    addPostMessageListener(CUSTOMIZATION_SCRIPT_QUERY, invokeLibraryFunction);
};

;// CONCATENATED MODULE: ../src/ts/rules-engine/RuleEngine.ts
var RuleEngine_assign = (undefined && undefined.__assign) || function () {
    RuleEngine_assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return RuleEngine_assign.apply(this, arguments);
};

















var EVENT_HANDLERS = new WfxMap();
var ALL_RULES;
var ALL_RULES_BY_ID = new WfxMap();
var ALL_RULES_ID_BY_WHERE_TYPE = new WfxMap();
var CURRENT_VALID_RULES_ID = new Set();
var ENT_ID;
var wfx_namespace;
var RuleEngine_$wnd;
var VisibilityRulesById = new WfxMap();
var userValue = {
    decryptedUser: null,
    encryptedUser: null,
    ruleID: null,
    ruleVersion: null
};
function _currentScript() {
    try {
        throw new Error();
    }
    catch (err) {
        var stackDetails = err.stack.split('\n');
        var scriptContent = null;
        for (var i = 0; i < stackDetails.length; i++) {
            var line = stackDetails[i].trim();
            var match = line.match(/(?:at\s+)?(?:\S+\s+)?(?:\(?.*\)?@)?(\S+):(\d+):(\d+)/);
            if (match) {
                var fileName = match[1];
                var lineNumber = parseInt(match[2], 10);
                var columnNumber = parseInt(match[3], 10);
                if (fileName && lineNumber && columnNumber) {
                    scriptContent = stackDetails[i];
                    break;
                }
            }
        }
        if (scriptContent) {
            var scripts = document.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
                if (scripts[i].src && scriptContent.indexOf(scripts[i].src) !== -1) {
                    return scripts[i];
                }
            }
        }
        return null;
    }
}
function initRuleEngine() {
    var _a, _b;
    var $cur_script = document.currentScript || _currentScript();
    wfx_namespace = $cur_script.getAttribute("data-wfx-namespace");
    var $wfx_is_sso = $cur_script.getAttribute("data-wfx-is-sso") == 'true';
    RuleEngine_$wnd = $wfx_is_sso ? window : window.parent;
    initObserver();
    Console.debug(LogCategory.COMMON, "Starting Rule Engine Initialisation...");
    var custEng = {
        evaluateCustomizationRules: evaluateCustomizationRules,
        onEvent: onEvent,
        getUser: getUser,
        getLocale: getLocale,
        localeResolver: localeResolver,
        initListeners: initListeners,
        onMessage: onMessageCallback,
        removeListener: removeListener,
        createElementJSON: ElementMap.createElementJSON,
        optimizeCustomizationEngineMemory: ElementMap.optimizeCustomizationEngineMemory,
        evaluateSegments: evaluateSegments,
        customizationEngineLogs: Console.customizationEngineLogs
    };
    var exposeIn = RuleEngine_$wnd[wfx_namespace];
    if (!exposeIn) {
        RuleEngine_$wnd[wfx_namespace] = { WFX: (_a = {}, _a[getCurrentModuleName()] = custEng, _a) };
    }
    else {
        exposeIn.WFX = RuleEngine_assign(RuleEngine_assign({}, exposeIn.WFX), (_b = {}, _b[getCurrentModuleName()] = custEng, _b));
    }
    EVENT_HANDLERS.set('onPageChange', onPageChange);
    EVENT_HANDLERS.set('onHrefChange', onHrefChange);
    EVENT_HANDLERS.set('onWhatfixCallback', onWhatfixCallback);
    EVENT_HANDLERS.set('onWhatfixCustomEventCallback', onWhatfixCustomEventCallback);
    EVENT_HANDLERS.set('handlePageChange', handlePageChangeForVisibilityRules);
    EVENT_HANDLERS.set('initPageTags', initPageTags);
    initWhereFactory();
    initWhenFactory();
    initWhatFactory();
    intiStrategies();
    initCustomEventMap();
    initMsgListeners();
    Console.debug(LogCategory.COMMON, "Rule Engine Initialised.");
}
function initMsgListeners() {
    addPostMessageListener("find_element_ce", findElement);
}
function evaluateCustomizationRules(rules) {
    Console.debug(LogCategory.COMMON, "Customization rules fetched: ", rules);
    var localeRules = rules.filter(function (rule) { return rule.rule_type === "locale_rule"; });
    var userIdentificationRules = rules.filter(function (rule) { return rule.rule_type === "user_identification_rule"; });
    Console.debug(LogCategory.LOCALE_RULE, " ".concat((localeRules === null || localeRules === void 0 ? void 0 : localeRules.length) > 0
        ? "Locale identification rules fetched:"
        : "Locale identification rule not found"), localeRules);
    Console.debug(LogCategory.USER_IDENTIFICATION_RULE, " ".concat((userIdentificationRules === null || userIdentificationRules === void 0 ? void 0 : userIdentificationRules.length) > 0
        ? "User identification rules fetched:"
        : "User identification rule not found"), userIdentificationRules);
    try {
        var customRules = filterRules(rules);
        initializeRuleCache(customRules);
        initAndEvaluateRules();
    }
    catch (error) {
        Console.debug(LogCategory.COMMON, " Error during evaluation of customization rules: ", error);
    }
}
var evaluateSegments = function (visibility_rules, isAsyncOnlyEvalNeeded) {
    var _a, _b;
    var widgetType = getSegmentType(visibility_rules[0]);
    var segmentId = (_a = visibility_rules[0]) === null || _a === void 0 ? void 0 : _a.associated_segment_id;
    var segmentName = (_b = visibility_rules[0]) === null || _b === void 0 ? void 0 : _b.associated_segment_name;
    Console.debugOn(widgetType, "".concat(widgetType, " name: ").concat(segmentName, ", id:").concat(segmentId));
    try {
        var result = evaluateAllClauseForSegments(visibility_rules, isAsyncOnlyEvalNeeded);
        Console.debugOff(widgetType);
        return result;
    }
    catch (error) {
        Console.debug(widgetType, "EvaluateSegments :: Error during evaluation of visibility rules for a segment with segment name: ".concat(segmentName, " segment id:").concat(segmentId, " :"), error);
        Console.debugOff(widgetType);
    }
};
function initializeRuleCache(rules) {
    ALL_RULES = rules;
    rules.forEach(function (rule) {
        ALL_RULES_BY_ID.set(rule.rule_id, rule);
        ENT_ID = rule.ent_id;
        var where = rule.where_conditions;
        where.forEach(function (orArr) {
            orArr.forEach(function (strategy) {
                var rulesByType = ALL_RULES_ID_BY_WHERE_TYPE.get(strategy.type);
                if (!rulesByType) {
                    rulesByType = [];
                    ALL_RULES_ID_BY_WHERE_TYPE.set(strategy.type, rulesByType);
                }
                rulesByType.push(rule.rule_id);
            });
        });
    });
}
function initAndEvaluateRules() {
    var validRules = [];
    ALL_RULES.forEach(function (rule) {
        if (rule.rule_enabled) {
            if (isValidOnPage(rule.where_conditions, rule.rule_type)) {
                validRules.push(rule);
                CURRENT_VALID_RULES_ID.add(rule.rule_id);
            }
        }
    });
    Console.debug(LogCategory.COMMON, "Rules valid on this page are: ", validRules);
    var localeRules = validRules.filter(function (rule) { return rule.rule_type === "locale_rule"; });
    var userIdentificationRules = validRules.filter(function (rule) { return rule.rule_type === "user_identification_rule"; });
    Console.debug(LogCategory.LOCALE_RULE, " ".concat((localeRules === null || localeRules === void 0 ? void 0 : localeRules.length) > 0
        ? "Locale identification rules valid on this page:"
        : "valid locale identification rule not found"), localeRules);
    Console.debug(LogCategory.USER_IDENTIFICATION_RULE, " ".concat((userIdentificationRules === null || userIdentificationRules === void 0 ? void 0 : userIdentificationRules.length) > 0
        ? "User identification rules valid on this page:"
        : "valid user identification rule not found"), userIdentificationRules);
    initValidRules(validRules, []);
}
function reevaluateRulesByType(type) {
    var newValidRules = [];
    var rulesToDestroy = [];
    var rulesByType = ALL_RULES_ID_BY_WHERE_TYPE.get(type);
    if (rulesByType) {
        rulesByType.forEach(function (rule_id) {
            var rule = ALL_RULES_BY_ID.get(rule_id);
            if (rule.rule_enabled) {
                Console.debugOn(rule.rule_type, " executing where block");
                Console.debug(rule.rule_type, "Evaluating filters from where block: ", rule.where_conditions);
                if (isValidOnPage(rule.where_conditions)) {
                    if (!CURRENT_VALID_RULES_ID.has(rule_id)) {
                        CURRENT_VALID_RULES_ID.add(rule_id);
                        newValidRules.push(rule);
                    }
                }
                else {
                    CURRENT_VALID_RULES_ID.delete(rule_id);
                    rulesToDestroy.push(rule);
                }
                Console.debugOff(rule.rule_type);
            }
        });
        Console.debug(LogCategory.COMMON, "Rules valid on this page are: ", newValidRules);
        var localeRules = newValidRules.filter(function (rule) { return rule.rule_type === "locale_rule"; });
        var userIdentificationRules = newValidRules.filter(function (rule) { return rule.rule_type === "user_identification_rule"; });
        Console.debug(LogCategory.LOCALE_RULE, " ".concat((localeRules === null || localeRules === void 0 ? void 0 : localeRules.length) > 0
            ? "Locale identification rules valid on this page:"
            : "valid locale identification rule not found"), localeRules);
        Console.debug(LogCategory.USER_IDENTIFICATION_RULE, " ".concat((userIdentificationRules === null || userIdentificationRules === void 0 ? void 0 : userIdentificationRules.length) > 0
            ? "User identification rules valid on this page:"
            : "valid user identification rule not found"), userIdentificationRules);
        initValidRules(newValidRules, rulesToDestroy);
    }
}
function onEvent(event) {
    try {
        if (EVENT_HANDLERS.has(event.type)) {
            return EVENT_HANDLERS.get(event.type)(event.data);
        }
    }
    catch (e) {
    }
}
function initPageTags(data) {
    pageTagStore.initialise(data.tag_ids);
}
function onPageChange(data) {
    pageTagStore.initialise(data.tag_ids);
    reevaluateRulesByType('page_tag');
}
function handlePageChangeForVisibilityRules(data) {
    pageTagStore.initialise(data.tag_ids);
    purgePendingRulesVisibilityRules();
}
function onHrefChange(data) {
    data.changedParams.forEach(function (param) {
        reevaluateRulesByType(param);
    });
}
function onWhatfixCallback(data) {
    return invokeWhatfixCallback(data);
}
function onWhatfixCustomEventCallback(data) {
    return invokeCustomEventCallback(data);
}
function getUser() {
    if (userValue.decryptedUser === null || userValue.decryptedUser === undefined) {
        var persistedUserInfo = RuleEngine_$wnd.localStorage.getItem(ENT_ID + DELIMITER + Constants_USER_ID_KEY_IN_LOCAL_STORAGE);
        if (persistedUserInfo !== null && persistedUserInfo !== undefined) {
            var tokens = persistedUserInfo.split(DELIMITER);
            if (tokens.length === 3) {
                userValue.ruleID = tokens[0];
                userValue.ruleVersion = tokens[1];
                userValue.encryptedUser = tokens[tokens.length - 1];
            }
        }
    }
    return userValue;
}
function getLocale() {
    if (localeValue === null || localeValue === undefined) {
        var persistedLocale = RuleEngine_$wnd.localStorage.getItem(ENT_ID + DELIMITER + LOCALE_KEY_IN_LOCAL_STORAGE);
        if (persistedLocale) {
            var tokens = persistedLocale.split(DELIMITER);
            return tokens[tokens.length - 1];
        }
    }
    return localeValue;
}
function filterRules(rules) {
    return rules.filter(function (rule) {
        var _a;
        return !(rule.rule_type === 'user_identification_rule'
            && ((_a = rule.configs) === null || _a === void 0 ? void 0 : _a.option_selected) !== 'custom_rule');
    });
}
function getWfxNamespace() {
    return wfx_namespace;
}
function getCurrentModuleName() {
    return "CustomizationEngine";
}
function getWfxNamespaceRef() {
    return getWfxNamespace() ? RuleEngine_$wnd[getWfxNamespace()] : RuleEngine_$wnd;
}

;// CONCATENATED MODULE: ../src/ts/common/Console.ts
var Console_read = (undefined && undefined.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var Console_spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};




var FixedSizeQueue = (function () {
    function FixedSizeQueue(maxSize) {
        this.maxSize = maxSize;
        this.queue = [];
    }
    FixedSizeQueue.prototype.enqueue = function (item) {
        if (this.queue.length >= this.maxSize) {
            this.queue.shift();
        }
        this.queue.push(item);
    };
    FixedSizeQueue.prototype.dequeue = function () {
        return this.queue.shift();
    };
    FixedSizeQueue.prototype.isEmpty = function () {
        return this.queue.length === 0;
    };
    FixedSizeQueue.prototype.toArray = function () {
        return Console_spreadArray([], Console_read(this.queue), false);
    };
    FixedSizeQueue.prototype.clear = function () {
        if (this.queue) {
            this.queue = [];
        }
    };
    return FixedSizeQueue;
}());
var customizationEngineLogs = new WfxMap();
var Console = (function () {
    function Console() {
    }
    Console.isDebugModeOn = function () {
        var _a, _b, _c;
        if (((_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a._wfx_settings) === null || _b === void 0 ? void 0 : _b.debug_mode) || ((_c = RuleEngine_$wnd === null || RuleEngine_$wnd === void 0 ? void 0 : RuleEngine_$wnd._wfx_settings) === null || _c === void 0 ? void 0 : _c.debug_mode)) {
            return true;
        }
        return false;
    };
    Console.debugOn = function (category, name) {
        Console.debug(category, name, null, true);
    };
    Console.debugOff = function (category) {
        Console.debug(category, "", null, false, true);
    };
    Console.debug = function (category, message, logObject, isGroupStart, isGroupEnd) {
        if (!Console.isDebugModeOn())
            return;
        if (!category)
            category = LogCategory.COMMON;
        var logEntry = {
            message: message,
            logObject: logObject,
            isGroupStart: isGroupStart,
            isGroupEnd: isGroupEnd
        };
        if (!customizationEngineLogs.has(category)) {
            customizationEngineLogs.set(category, new FixedSizeQueue(LogCategorySize.get(category) || LogCategoryDefaultSize));
        }
        var logs = customizationEngineLogs.get(category);
        if (logs) {
            logs.enqueue(logEntry);
        }
    };
    Console.debugNative = function (message, object) {
        var _a, _b;
        (_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a._wfx_console) === null || _b === void 0 ? void 0 : _b.debug(message, object || {});
    };
    Console.debugOnNative = function (message) {
        var _a, _b;
        (_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a._wfx_console) === null || _b === void 0 ? void 0 : _b.debugOn(message);
    };
    Console.debugOffNative = function () {
        var _a, _b;
        (_b = (_a = getWfxNamespaceRef()) === null || _a === void 0 ? void 0 : _a._wfx_console) === null || _b === void 0 ? void 0 : _b.debugOff();
    };
    Console.customizationEngineLogs = function (category) {
        if (!Console.isDebugModeOn()) {
            window.console.error("Debug mode is not turned on, please turn the debug mode true using live expressions in order to store and view the logs related to customization engine. (use: _wfx_settings.debug_mode=true;)");
        }
        if (category) {
            if (LogCategory.COMMON !== category) {
                Console.printCustomizationEngineLogs(LogCategory.COMMON);
            }
            Console.printCustomizationEngineLogs(category);
        }
        else {
            var logTypes = Object.keys(LogCategory);
            logTypes.forEach(function (type) {
                Console.printCustomizationEngineLogs(type.toLowerCase());
            });
        }
    };
    Console.printCustomizationEngineLogs = function (category) {
        var _a, _b;
        if (category === LogCategory.VISIBILITY_RULE) {
            var logTypes = Object.keys(SegmentType);
            logTypes.forEach(function (type) {
                Console.printCustomizationEngineLogs(SegmentType[type]);
            });
            return;
        }
        var logs = (_a = customizationEngineLogs.get(category)) === null || _a === void 0 ? void 0 : _a.toArray();
        if (!logs || logs.length === 0) {
            Console.debugNative("No logs found for group: ".concat(category), {});
            return;
        }
        Console.debugOnNative(category);
        logs.forEach(function (log) {
            if (log.isGroupStart) {
                Console.debugOnNative(log.message);
            }
            else if (log.isGroupEnd) {
                Console.debugOffNative();
            }
            else {
                Console.debugNative(log.message, log.logObject || {});
            }
        });
        Console.debugOffNative();
        (_b = customizationEngineLogs.get(category)) === null || _b === void 0 ? void 0 : _b.clear();
    };
    return Console;
}());


;// CONCATENATED MODULE: ../src/ts/index.ts
var ts_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ts_generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



function init() {
    return new Promise(function (resolve, reject) {
        return ts_awaiter(this, void 0, void 0, function () {
            return ts_generator(this, function (_a) {
                initRuleEngine();
                resolve(true);
                return [2];
            });
        });
    });
}
init().then(function () {
    Console.debug(LogCategory.COMMON, 'Module customization-engine loaded');
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/sharing */
/******/ 	!function() {
/******/ 		__webpack_require__.S = {};
/******/ 		var initPromises = {};
/******/ 		var initTokens = {};
/******/ 		__webpack_require__.I = function(name, initScope) {
/******/ 			if(!initScope) initScope = [];
/******/ 			// handling circular init calls
/******/ 			var initToken = initTokens[name];
/******/ 			if(!initToken) initToken = initTokens[name] = {};
/******/ 			if(initScope.indexOf(initToken) >= 0) return;
/******/ 			initScope.push(initToken);
/******/ 			// only runs once
/******/ 			if(initPromises[name]) return initPromises[name];
/******/ 			// creates a new share scope if needed
/******/ 			if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 			// runs all init snippets from all modules reachable
/******/ 			var scope = __webpack_require__.S[name];
/******/ 			var warn = function(msg) {
/******/ 				if (typeof console !== "undefined" && console.warn) console.warn(msg);
/******/ 			};
/******/ 			var uniqueName = "customization-engine";
/******/ 			var register = function(name, version, factory, eager) {
/******/ 				var versions = scope[name] = scope[name] || {};
/******/ 				var activeVersion = versions[version];
/******/ 				if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 			};
/******/ 			var initExternal = function(id) {
/******/ 				var handleError = function(err) { warn("Initialization of sharing external failed: " + err); };
/******/ 				try {
/******/ 					var module = __webpack_require__(id);
/******/ 					if(!module) return;
/******/ 					var initFn = function(module) { return module && module.init && module.init(__webpack_require__.S[name], initScope); }
/******/ 					if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 					var initResult = initFn(module);
/******/ 					if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 				} catch(err) { handleError(err); }
/******/ 			}
/******/ 			var promises = [];
/******/ 			switch(name) {
/******/ 			}
/******/ 			if(!promises.length) return initPromises[name] = 1;
/******/ 			return initPromises[name] = Promise.all(promises).then(function() { return initPromises[name] = 1; });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(697);
/******/ 	
/******/ })()
;