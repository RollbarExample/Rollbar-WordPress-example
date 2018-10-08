/*
//Contributors:
// Alex Shram
// Bohdan Plaksii
// Krystian Biesaga
// Alex Ischenko
// Anand Upadhyay
// Facebook - https://www.facebook.com/groups/579320655787953/
*/

//EXIT TO DASHBOARD ICON IN FOOTER ELEMENTOR PANEL
var cws_exit_button = document.createElement("div");
cws_exit_button.setAttribute("id", "cws-exit-to-dashboard");
cws_exit_button.classList.add("elementor-panel-footer-tool");
cws_exit_button.classList.add("elementor-leave-open");
cws_exit_button.classList.add("tooltip-target");
cws_exit_button.setAttribute("data-tooltip", "Exit to Dashboard");
cws_exit_button.setAttribute("title", "Exit");

var cws_exit_link = document.createElement("a");
//cws_exit_link.setAttribute("href", window.location.href.replace("&action=elementor", "&action=edit"));
//cws_exit_link.setAttribute("target", "_blank");
var cws_exit_icon = document.createElement("i");
cws_exit_icon.classList.add("fa");
cws_exit_icon.classList.add("fa-sign-out");

//Exit to page edit
function exitToPageEdit() {
    cws_exit_link.setAttribute("href", window.location.href.replace("&action=elementor", "&action=edit"));
}
//Exit to page list
function exitToPageList() {
    cws_exit_link.setAttribute("href", window.location.href.split('wp-admin')[0] + 'wp-admin/edit.php?post_type=page');
}
//Exit to Elementor library
function exitToElementorLibrary() {
    cws_exit_link.setAttribute("href", window.location.href.split('wp-admin')[0] + 'wp-admin/edit.php?post_type=elementor_library');
}
//Exit to admin dashboard
function exitToAdminDashboard() {
    cws_exit_link.setAttribute("href", window.location.href.split('wp-admin')[0] + 'wp-admin/');
}
// Target _blank
function exitBlank() {
    cws_exit_link.setAttribute("target", "_blank");
}
// Target _self
function exitSelf() {
    cws_exit_link.setAttribute("target", "_self");
}
function elementor_switcher_display_block() {
    $("#elementor-mode-switcher").css("display", "block");
  $("#elementor-panel").css("transition", "all .5s");
}
function elementor_switcher_display_none() {
    $("#elementor-mode-switcher").css("display", "none");
    $("#elementor-panel").css("transition", ".1s");
}
//    Add Grid Ruler UX
function use_grid_ruler_on() {
    $('body').addClass("fep-elementor-grid-ruler");
    //
    // $('body .elementor-editor-active #elementor-preview').css('right','300px');
    // $('body .elementor-editor-active #elementor-preview').css('left','0px');
    // $('body .elementor-editor-active #elementor-panel').css('right','0px');
}
function use_grid_ruler_off() {
    $('body').removeClass("fep-elementor-grid-ruler");
}



//Make Elementor Panel draggable
function draggablePanel () {
    $(document).ready(function () {
        $("#elementor-panel").draggable({
            snap: "#elementor-preview",
            opacity: 0.7,
            cancel: ".not-draggable",
            addClasses: false,
            containment: "window",
            snapMode: "inner",
            snapTolerance: 25
        });
    });
    //
    $("#elementor-panel").css("height", $(window).height());
    $("#elementor-mode-switcher").css("height", "40px");
    $("#elementor-panel-content-wrapper").addClass("not-draggable");
    $("#elementor-panel-footer").addClass("not-draggable");
    $("#elementor-panel-header-title").css("cursor", "move");
    $(".elementor-panel#elementor-panel").css("transition", "none");
    $(".elementor-panel#elementor-panel").css("transition", "height 0.15s ease-in-out");
    $(".elementor-panel#elementor-panel").css("position", "absolute!important");
//    MOUSEDOWN
    $(document).mouseup(function () {
        if ($("#elementor-preview").css("pointer-events") == "none") {
            $("#elementor-preview").css("pointer-events", "auto");
        }
    });
}
//MOUSEDOWN
function mousedownHeaderTitle() {
    $("#elementor-preview").css("pointer-events", "none");
    if ($(window).height() == $('#elementor-panel').height() && $('#elementor-panel').css('left') == '0px')
    {
        $("#elementor-panel").css("height", "65%");
        $(".elementor-panel#elementor-panel").css("transition", "height 0.1s linear")
        $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');
        $(".elementor-panel>.ui-resizable-e").addClass("ui-resizable-all");
        $(".elementor-panel>.ui-resizable-e").removeClass("ui-resizable-e");
        elementor_switcher_display_none();
    }
}
//MOUSEUP
function mouseupHeaderTitle() {
    if ($('#elementor-panel').css('left') === '0px' && $('#elementor-panel').css('top') === '0px') {
        $("#elementor-panel").css("height", $(window).height() + 'px');
        $('body').removeClass('cws-preview-full').addClass('cws-preview-boxed');
        $("#elementor-panel-content-wrapper").slideDown(150);
        $("#elementor-panel-footer").slideDown(150);
        $(".elementor-panel#elementor-panel").css("transition", "height 0.15s ease-in-out");
        $(".elementor-panel>.ui-resizable-all").addClass("ui-resizable-e");
        $(".elementor-panel>.ui-resizable-all").removeClass("ui-resizable-all");
        elementor_switcher_display_block();
    }
    if ($('#elementor-panel').css('right') === '0px' && $('#elementor-panel').css('top') === '0px') {
        $("#elementor-panel").css("height", $(window).height() + 'px');
        //$('body').removeClass('cws-preview-full').addClass('cws-preview-boxed');
        $("#elementor-panel-content-wrapper").slideDown(150);
        $("#elementor-panel-footer").slideDown(150);
        $(".elementor-panel#elementor-panel").css("transition", "height 0.15s ease-in-out");
        $(".elementor-panel>.ui-resizable-all").addClass("ui-resizable-e");
        $(".elementor-panel>.ui-resizable-all").removeClass("ui-resizable-all");
    }
}
    function mouseupWindow()
    {
        $(window).mouseup(function () {
            if ($('#elementor-panel').css('left') === '0px' && $('#elementor-panel').css('top') === '0px')
            {
                $("#elementor-panel").css("height", $(window).height() + 'px');
            }
        });
    }
function  minimize_category_space() {
    document.body.classList.add("fep-minimize-category");
}
function  not_minimize_category_space() {
    document.body.classList.remove("fep-minimize-category");
}

function loadFepSettings() {
    console.log(fepConfig);
    if (fepConfig.draggable_panel == 'yes') {
        $("#elementor-panel" ).draggable( "enable" );
        $("#elementor-panel-header-title").on('mousedown', mousedownHeaderTitle);
        $("#elementor-panel-header-title").on('mouseup', mouseupHeaderTitle);
        $(window).on('mouseup', mouseupWindow);
    }
    if (fepConfig.draggable_panel == 'no') {
        $("#elementor-panel" ).draggable( "disable" );
        $("#elementor-panel-header-title").off('mousedown', mousedownHeaderTitle);
        $("#elementor-panel-header-title").off('mouseup', mouseupHeaderTitle);
        $(window).off('mouseup', mouseupWindow);
    }
    if (fepConfig.minimize_category_space == 'yes') {
        minimize_category_space();
    }
    if (fepConfig.minimize_category_space == 'no') {
        not_minimize_category_space();
    }
    if (fepConfig.use_grid_ruler == 'yes') {
        use_grid_ruler_on();
    }
    if (fepConfig.use_grid_ruler == 'no') {
        use_grid_ruler_off();
    }
    if (fepConfig.editor_skin == 'dark') {
        document.body.classList.add("nightmode");
    }
    if (fepConfig.editor_skin == 'light') {
        document.body.classList.remove("nightmode");
    }
    if (fepConfig.dashboard_link_new_tab == 'yes') {
        exitBlank();
    }
    if (fepConfig.dashboard_link_new_tab == 'no') {
        exitSelf();
    }
    if (fepConfig.dashboard_link_point == 'page_edit') {
        exitToPageEdit();
    }
    if (fepConfig.dashboard_link_point == 'page_list') {
        exitToPageList();
    }
    if (fepConfig.dashboard_link_point == 'elementor_library') {
        exitToElementorLibrary();
    }
    if (fepConfig.dashboard_link_point == 'admin_dashboard') {
        exitToAdminDashboard();
    }
    if (fepConfig.accordion_options == 'yes') {
        $('.elementor-accordion .elementor-tab-title').removeClass('elementor-active');
        $('.elementor-accordion .elementor-tab-content').css('display', 'none');
    }
    if (fepConfig.accordion_options == 'no') {
        $('.elementor-accordion .elementor-tab-title').addClass('elementor-active');
        $('.elementor-accordion .elementor-tab-content').css('display', 'block');
    }
}
//////////////////////////////////////WINDOW ONLOAD//////////////////////////////////////////////////////
window.onload = function () {

    $(window).bind("DOMSubtreeModified", function () {
        if ($('#elementor-panel').css('left') === '0px' && $('#elementor-panel').css('top') === '0px' && $(window).height() == $('#elementor-panel').height() && $('#elementor-panel').css('left') == '0px') {
            elementor_switcher_display_block();
        }
        
    });
////////////////////////////////////////////////
    use_grid_ruler_off();
////////////////////////////////////////////////
    draggablePanel();
    elementor_switcher_display_block();
    $( "#elementor-panel" ).draggable( "disable" );
    loadFepSettings();
    $(document).on('change', "select[data-setting='editor_skin']", function () {
        fepConfig.editor_skin = this.value;
        loadFepSettings();
    });
    $(document).on('change', "input[data-setting='draggable_panel']", function () {
        fepConfig.draggable_panel = $(this).is(':checked') ? 'yes' : 'no';
        //fepConfig.draggable_panel = this.value;
        loadFepSettings();
        // if (confirm("Reload page?")) {
        //     window.location.reload(true);
        // }
    });
    $(document).on('change', "input[data-setting='minimize_category_space']", function () {
        fepConfig.minimize_category_space = $(this).is(':checked') ? 'yes' : 'no';
        //fepConfig.minimize_category_space = this.value;
        loadFepSettings();
        // if (confirm("Reload page?")) {
        //     window.location.reload(true);
        // }
    });
    $(document).on('change', "input[data-setting='use_grid_ruler']", function () {
        fepConfig.use_grid_ruler = $(this).is(':checked') ? 'yes' : 'no';
        $("#elementor-panel").css("height", $(window).height());
        loadFepSettings();
    });
    $(document).on('change', "input[data-setting='accordion_options']", function () {
        fepConfig.accordion_options = $(this).is(':checked') ? 'yes' : 'no';
        fepConfig.accordion_options = this.value;
        loadFepSettings();
    });
    $(document).on('change', "select[data-setting='dashboard_link_point']", function () {
        fepConfig.dashboard_link_point = this.value;
        loadFepSettings();
    });
    $(document).on('change', "input[data-setting='dashboard_link_new_tab']", function () {
        fepConfig.dashboard_link_new_tab = $(this).is(':checked') ? 'yes' : 'no';
        loadFepSettings();
    });
    $(document).on('change', "select[data-setting='collapsible_panel']", function () {
        fepConfig.collapsible_panel = this.value;
        loadFepSettings();
    });
/////////////////////////////////////////////////////////////////////


    //CLOSE ALL WIDGET CATEGORY
    localStorage.setItem('cat-closed', '1');
    document.addEventListener('contextmenu', event => event.preventDefault());
    function WhichButton(event) {
        if(event.button==2)
        {

            if (document.getElementById("elementor-panel-elements-navigation-all") != null && document.getElementById("elementor-panel-elements-navigation-all").classList.contains("elementor-active")) {
                if ($("#elementor-panel-category-basic").length != 0) {

                    if (localStorage.getItem('cat-closed') == 0) {

                        $(".elementor-panel-category-items").slideUp("280");
                        $(".elementor-panel-category").removeClass("elementor-active");
                        //$(".elementor-panel-category-items").delay(400).css("display", "none");
                        $('.elementor-panel-category-items')
                            .delay(280)
                            .queue(function (next) {
                                $(this).css('display', 'none');
                                next();
                            });

                        localStorage.setItem('cat-closed', '1');

                    }
                    else if (localStorage.getItem('cat-closed') == 1) {
                        $(".elementor-panel-category").addClass("elementor-active");
                        $(".elementor-panel-category-items").slideDown("280");
                        $(".elementor-panel-category-items").css("display", "block");


                        localStorage.setItem('cat-closed', '0');

                    }
                }
            }

        }
    }
    $( "#elementor-panel-inner" ).mousedown(WhichButton);
    $("#elementor-panel-categories").sortable({
        cursor: "move",
        axis: "y",
        opacity: 0.5,
        cancel: ".elementor-element-wrapper"
    });

    $('#elementor-panel-content-wrapper').bind("DOMSubtreeModified", function () {
        if (document.getElementById("elementor-panel-elements-navigation-all") != null && document.getElementById("elementor-panel-elements-navigation-all").classList.contains("elementor-active")) {
            if ($("#elementor-panel-category-basic").length != 0) {
                $("#elementor-panel-categories").sortable({
                    cursor: "move",
                    axis: "y",
                    opacity: 0.5,
                    cancel: ".elementor-element-wrapper"
                });

            }
        }
    });

    /*Set start attributes*/

    //$(".elementor-panel>.ui-resizable-e").addClass("ui-resizable-all");
    //$(".elementor-panel>.ui-resizable-e").removeClass("ui-resizable-e");
    /**************************************************************************************************************/
    //add exit icon
    cws_exit_link.appendChild(cws_exit_icon);
    cws_exit_button.appendChild(cws_exit_link);
    jQuery(cws_exit_button).insertAfter("#elementor-panel-saver-button-preview");
    jQuery(cws_exit_button).insertAfter("#elementor-panel-footer-theme-builder-button-preview-wrapper");
    $(cws_exit_button).tipsy({gravity: 's'});
    /*****************************************************************************************/
    /*Make resize Elementor Panel */

    /**************************************************************************************************************/
    $(".elementor-panel>.ui-resizable-all").mousedown(function () {
        $(".elementor-panel#elementor-panel").css("transition", "none");
        $(".elementor-panel>.ui-resizable-all").css("opacity", "1");
    });
    $(".elementor-panel>.ui-resizable-all").mouseup(function () {
        $(".elementor-panel#elementor-panel").css("transition", "height 0.15s ease-in-out");
        $(".elementor-panel>.ui-resizable-all.elementor-panel>.ui-resizable-all").css("opacity", "0.2");
    });
    /**************************************************************************************************************/



    /**************************************************************************************************************/
    // //ADD ICON TO ELEMENTOR WIDGETS CATEGORY
    // function arrow_icon_in_elementor_widgets_category() {
    //     var count_elementor_widgets_category = jQuery(".elementor-panel-category");
    //     var cws_count = 0;
    //
    //     for (cws_count = 0; cws_count < count_elementor_widgets_category.length; cws_count++) {
    //         var icon_for_widgets_category = document.createElement("i");
    //         icon_for_widgets_category.classList.add("fa");
    //         icon_for_widgets_category.classList.add("fa-caret-down");
    //         icon_for_widgets_category.classList.add("cws-fa-icon-caret");
    //         count_elementor_widgets_category[cws_count].insertBefore(icon_for_widgets_category, count_elementor_widgets_category[cws_count].getElementsByClassName("panel-elements-category-title")[0]);
    //     }
    // }
    // /**************************************************************************************************************/
    // //START ORDERING FROM LOCAL STORAGE
    // function cws_order_category_start() {
    //     if (localStorage.getItem('cws-order-category') != null) {
    //         var cws_array_for_order = localStorage.getItem('cws-order-category').split(",");
    //
    //         var cws_my_categ = document.getElementsByClassName("elementor-panel-category");
    //         var cws_count_categ = 0;
    //         var cws_count_categ_j = 0;
    //
    //         for (cws_count_categ = 0; cws_count_categ < cws_array_for_order.length; cws_count_categ++) {
    //             for (cws_count_categ_j = 0; cws_count_categ_j < cws_my_categ.length; cws_count_categ_j++) {
    //                 if (cws_array_for_order[cws_count_categ] == cws_my_categ[cws_count_categ_j].id) {
    //                     document.getElementsByClassName("elementor-panel-category")[cws_count_categ_j].parentElement.insertBefore(document.getElementsByClassName("elementor-panel-category")[cws_count_categ_j], document.getElementsByClassName("elementor-panel-category")[cws_count_categ]);
    //                 }
    //             }
    //         }
    //     }
    // }
    // /**************************************************************************************************************/
    // //ORDERING ELEMENTOR WIDGETS CATEGORY
    // function cws_order_widgets_category(event, ui) {
    //     var cws_my_categ = document.getElementsByClassName("elementor-panel-category");
    //     var cws_count_categ = 0;
    //     var cws_array_for_count_category = [];
    //
    //     for (cws_count_categ = 0; cws_count_categ < cws_my_categ.length; cws_count_categ++) {
    //         cws_array_for_count_category[cws_count_categ] = cws_my_categ[cws_count_categ].id;
    //     }
    //     localStorage.setItem('cws-order-category', cws_array_for_count_category);
    // }
    // /**************************************************************************************************************/
    // // COLLAPSED ALL WIDGETS CATEGORY
    // function collapsed_all_categ_function() {
    //     if ($("#elementor-panel-elements-search-area").length == 0) {
    //         return;
    //     }
    //     var cws_collapsed_categ_wrapper = document.createElement("div");
    //     cws_collapsed_categ_wrapper.setAttribute("id", "cws-collapsed-wrap-id");
    //     cws_collapsed_categ_wrapper.classList.add("cws-collapsed-wrapper");
    //     // ADD TOGGLE ICON TO WRAPPER
    //     var collapsed_toggle_icon = document.createElement("i");
    //     collapsed_toggle_icon.classList.add("fa");
    //     collapsed_toggle_icon.classList.add("fa-toggle-off");
    //     cws_collapsed_categ_wrapper.appendChild(collapsed_toggle_icon);
    //
    //     var searchWrapper = document.getElementById("elementor-panel-elements-search-wrapper");
    //     $(cws_collapsed_categ_wrapper).insertBefore(searchWrapper);
    //
    //     collapsed_toggle_icon.onclick = function () {
    //         if (collapsed_toggle_icon.classList.contains("fa-toggle-off")) {
    //             collapsed_toggle_icon.classList.remove("fa-toggle-off");
    //             collapsed_toggle_icon.classList.add("fa-toggle-on");
    //             localStorage.setItem('LS_collapsed_toggle_icon', '0');
    //         }
    //         else if (collapsed_toggle_icon.classList.contains("fa-toggle-on")) {
    //             collapsed_toggle_icon.classList.remove("fa-toggle-on");
    //             collapsed_toggle_icon.classList.add("fa-toggle-off");
    //             localStorage.setItem('LS_collapsed_toggle_icon', '1');
    //         }
    //     }
    //
    //     //COLLAPSED ALL WIDGETS CATEGORY
    //     $("#cws-collapsed-wrap-id").click(function () {
    //             if (collapsed_toggle_icon.classList.contains("fa-toggle-off")) {
    //                 $(".panel-elements-category-items").slideUp();
    //                 $(".cws-fa-icon-caret").removeClass("fa-caret-down").addClass("fa-caret-right");
    //                 localStorage.setItem('LS_collapsed_all_categ', '0');
    //             }
    //             else if (collapsed_toggle_icon.classList.contains("fa-toggle-on")) {
    //                 $(".panel-elements-category-items").slideDown();
    //                 $(".cws-fa-icon-caret").removeClass("fa-caret-right").addClass("fa-caret-down");
    //                 localStorage.setItem('LS_collapsed_all_categ', '1');
    //             }
    //         }
    //     );
    //     //GET FROM LOCAL STORAGE WHAT'S ICON IS ACTIVE
    //     if (localStorage.getItem('LS_collapsed_toggle_icon') == 1) {
    //         collapsed_toggle_icon.classList.remove("fa-toggle-on");
    //         collapsed_toggle_icon.classList.add("fa-toggle-off");
    //         localStorage.setItem('LS_collapsed_toggle_icon', '0');
    //     } else if (localStorage.getItem('LS_collapsed_toggle_icon') == 0) {
    //         collapsed_toggle_icon.classList.add("fa-toggle-on");
    //         collapsed_toggle_icon.classList.remove("fa-toggle-off");
    //         localStorage.setItem('LS_collapsed_toggle_icon', '1');
    //     }
    // }

    // function cws_collapsed_category_start() {
    //     if (document.getElementsByClassName("elementor-panel-category").length != 0) {
    //         $(".panel-elements-category-title-basic").removeClass("panel-elements-category-title-basic").addClass("panel-elements-category-title-general");
    //         arrow_icon_in_elementor_widgets_category();
    //         cws_order_category_start();
    //         var cws_my_categ = document.getElementsByClassName("elementor-panel-category");
    //         var cws_count_categ = 0;
    //         for (cws_count_categ = 0; cws_count_categ < cws_my_categ.length; cws_count_categ++) {
    //             if (localStorage.getItem(cws_my_categ[cws_count_categ].getElementsByClassName("panel-elements-category-title")[0].textContent) != null) {
    //                 if (localStorage.getItem(cws_my_categ[cws_count_categ].getElementsByClassName("panel-elements-category-title")[0].textContent) == 0) {
    //                     $(cws_my_categ[cws_count_categ]).find(".panel-elements-category-title").next().slideUp();
    //                     $(cws_my_categ[cws_count_categ]).find(".panel-elements-category-title").prev().removeClass("fa-caret-down").addClass("fa-caret-right");
    //                 }
    //                 else if (localStorage.getItem(cws_my_categ[cws_count_categ].getElementsByClassName("panel-elements-category-title")[0].textContent) == 1) {
    //                     $(cws_my_categ[cws_count_categ]).find(".panel-elements-category-title").next().slideDown();
    //                     $(cws_my_categ[cws_count_categ]).find(".panel-elements-category-title").prev().removeClass("fa-caret-right").addClass("fa-caret-down");
    //                 }
    //             }
    //         }
    //     }
    // }
        //         // ORDER CATEGORIES
        //         $("#elementor-panel-categories").sortable({
        //             cursor: "move",
        //             axis: "y",
        //             opacity: 0.5,
        //             cancel: ".elementor-element-wrapper",
        //             update: function (event, ui) {
        //                 cws_order_widgets_category(event, ui);
        //             }
        //         });
        //     }
        // }
        // SORTABLE WIDGETS
        // $(".panel-elements-category-items").sortable(
        //     {
        //         connectWith: $(".elementor-panel-category").find(".panel-elements-category-items")
        //     }
        // );
        // /**************************************************************************************************************/
        // cws_collapsed_category_start();
        // collapsed_all_categ_function();
        // $('#elementor-panel-content-wrapper').bind("DOMSubtreeModified", function () {
        //     if (document.getElementById("elementor-panel-elements-navigation-all") != null && document.getElementById("elementor-panel-elements-navigation-all").classList.contains("elementor-active")) {
        //         if ($(".panel-elements-category-title-basic").length != 0) {
        //             cws_collapsed_category_start();
        //         }
        //     }
        // });
        // $('#elementor-panel-inner').bind("DOMSubtreeModified", function () {
        //     if ($(".cws-collapsed-wrapper").length == 0) {
        //         collapsed_all_categ_function();
        //     }
        // });
        /**************************************************************************************************************/


        /**************************************************************************************************************/
//    ADD ICON FOR VERTICAL COLLAPSE ELEMENTOR PANEL
    var fep_header_wrapper = document.createElement("div");
    fep_header_wrapper.classList.add("fep-header-button-wrapper");
    $("#elementor-panel-header #elementor-panel-header-menu-button").after(fep_header_wrapper);
    var fep_collapsed_input = document.createElement("INPUT");
    fep_collapsed_input.setAttribute("type", "checkbox");
    fep_collapsed_input.setAttribute("id", "elementor-vertical-mode-switcher-preview-input");
    fep_collapsed_input.setAttribute("label", "elementor-vertical-mode-switcher-preview-input");
    fep_collapsed_input.setAttribute("title", "Collapse Panel");
    var closeikon = document.createElement("i");
    closeikon.classList.add("fa");
    closeikon.classList.add("fa-chevron-up");
    closeikon.classList.add("cws-toggle-panel-icon");
    fep_collapsed_input.append(closeikon);
    fep_header_wrapper.append(fep_collapsed_input);

//    FUNCTION VERTICAL COLLAPSE/EXPAND ELEMENTOR PANEL
        function vertical_elementor_panel_toggle() {
            if (parseInt($("#elementor-panel").css("top")) == ($(window).height() - 40)) {
                $(".elementor-panel#elementor-panel").css("transition", "top height 0.15s ease-in-out");
                $("#elementor-panel").css("height", "250px");
                $("#elementor-panel").css("top", $(window).height() - 250);
                $("#elementor-panel-content-wrapper").slideToggle(150);
                $("#elementor-panel-footer").slideToggle(150);
                $(".elementor-panel#elementor-panel").css("transition", "height 0.15s ease-in-out");
                $(".elementor-panel>.ui-resizable-all").css("display", "none");
            } else {
                $("#elementor-panel-content-wrapper").slideToggle(150);
                $("#elementor-panel-footer").slideToggle(150);
                if ($("#elementor-panel").css("height") != "40px") {
                    $("#elementor-panel").css("height", "40px");
                }
                else if ($("#elementor-panel").css("height") == "40px") {
                    $("#elementor-panel").css("height", $(window).height() - parseInt($("#elementor-panel").css("top")));
                }
            }
        }
//    FUNCTION HORIZONTAL COLLAPSE/EXPAND ELEMENTOR PANEL
        function horizontal_elementor_panel_toggle() {
            if ($("#elementor-panel").css("top") != '0px' && $("#elementor-panel").css("left") != '0px') {
                return;
            }
            if ($("#elementor-panel").css("top") == '0px' && $("#elementor-panel").css("left") != '0px') {
                $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');
            }
            if ($("#elementor-panel").css("top") != '0px' && $("#elementor-panel").css("left") == '0px') {
                $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');
            }
            else {
                $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');
            }
        }


    $(document).ready(function() {
        $("#elementor-vertical-mode-switcher-preview-input").click(function() {
            var checkBoxes = $("input[name=recipients\\[\\]]");
            checkBoxes.prop("checked", !checkBoxes.prop("checked"));
        });
        $('#elementor-vertical-mode-switcher-preview-input').click(function()
        {
            // if ($("#elementor-panel").css("top") == '0px' && $("#elementor-panel").css("left") == '0px') {
            //     if($(this).is(':checked')) {
            //        alert("Collapsed");
            //     }
            //     else {
            //        alert("Expand");
            //     }
            // }
            if($(this).is(':checked')) {
                vertical_elementor_panel_toggle();
                elementor_switcher_display_none();
                if ($("#elementor-panel").css("top") != '0px' && $("#elementor-panel").css("left") != '0px') {
                    return;
                }
                if ($("#elementor-panel").css("top") == '0px' && $("#elementor-panel").css("left") != '0px') {
                    $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');
                }
                if ($("#elementor-panel").css("top") != '0px' && $("#elementor-panel").css("left") == '0px') {
                    $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');
                }
                var widthElementorPanel = $("#elementor-panel").width();
                $('.cws-preview-boxed #elementor-preview').css('left', widthElementorPanel);
                $('body').addClass('cws-preview-full').removeClass('cws-preview-boxed');

                $(".elementor-panel>.ui-resizable-e").removeClass("ui-resizable-all");
            }
            else
            {
                vertical_elementor_panel_toggle();
                if ($("#elementor-panel").css("top") != '0px' && $("#elementor-panel").css("left") != '0px') {
                    return;
                }
                if ($("#elementor-panel").css("top") == '0px' && $("#elementor-panel").css("left") != '0px') {
                    return;
                }
                if ($("#elementor-panel").css("top") != '0px' && $("#elementor-panel").css("left") == '0px') {
                    return;
                }
                if ($("#elementor-panel").css("top") == '0px' && $("#elementor-panel").css("left") == '0px') {
                    $('body').removeClass('cws-preview-full').addClass('cws-preview-boxed');
                    elementor_switcher_display_block();
                }

                var widthElementorPanel = $("#elementor-panel").width();
                $('.cws-preview-boxed #elementor-preview').css('left', widthElementorPanel);

                $(".elementor-panel>.ui-resizable-e").addClass("ui-resizable-all");
            }
        }
        );
    });

};