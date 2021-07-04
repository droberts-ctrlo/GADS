// get the value from a field, depending on its type
var getFieldValues = function($depends, filtered, for_code) {

  var type = $depends.data("column-type");

  // If a field is not shown then treat it as a blank value (e.g. if fields
  // are in a hierarchy and the top one is not shown, or if the user does
  // not have write access to the field).
  // At the moment do not do this for calc fields, as these are not currently
  // shown and therefore will always return blank. This may need to be
  // updated in the future in order to do something similar as normal fields
  // (returning blank if they themselves would not be shown under display
  // conditions)
  if ($depends.length == 0 || $depends.css("display") == "none") {
    if (type != "calc") {
      return [""];
    }
  }


  var values = [];
  var $visible;
  var $f;

  if (type === "enum" || type === "curval") {
    if (filtered) {
      // Field is type "filval". Therefore the values are any visible value in
      // the associated filtered drop-down
      $visible = $depends.find(".select-widget .available .answer");
      $visible.each(function() {
        var item = $(this).find('[role="option"]');
        values.push(item.text());
      });
    } else {
      $visible = $depends.find(
        ".select-widget .current [data-list-item]:not([hidden])"
      );
      $visible.each(function() {
        var item = $(this).hasClass("current__blank")
          ? null
          : $(this);
        values.push(item);
      });
    }
    if (for_code) {
      if ($depends.data('is-multivalue')) {
        // multivalue
        return $.map(values, function(item) {
          return {
            id:    item.data("list-id"),
            value: item.data("list-text")
          };
        });
      } else {
        // single value
        if (values.length && values[0]) {
          return values[0].data("list-text");
        } else {
          return null;
        }
      }
    } else {
      values = $.map(values, function(item) {
        if (item) {
          return item.data("list-text");
        } else {
          return "";
        }
      });
    }
  } else if (type === "person") {
    values = [$depends.find("option:selected").text()];
  } else if (type === "tree") {
    // get the hidden fields of the control - their textual value is located in a dat field
    $depends.find(".selected-tree-value").each(function() {
      values.push($(this).data("text-value"));
    });
  } else if (type === "daterange") {
    $f = $depends.find(".form-control");
    values = $f
      .map(function() {
        return $(this).val();
      })
      .get()
      .join(" to ");
  } else {
    $f = $depends.find(".form-control");
    values = [$f.val()];
  }

  // A multi-select field with no values selected should be the same as a
  // single-select with no values. Ensure that both are returned as a single
  // empty string value. This is important for display_condition testing, so
  // that at least one value is tested, even if it's empty
  if (values.length == 0) {
    values = [""];
  }

  return values;
};

export { getFieldValues };
