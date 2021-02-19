var windosize_customize = {
 localeSize: null,
 localeDelete: null,
 ReloadCurrentList: function()
 {
  var labels = windosize_common.LoadFromPrefs();
  var listbox = document.getElementById('windosize-customize-currentlist');
  while(listbox.getRowCount() !== 0)
  {
   listbox.removeItemAt(0);
  }
  for(var i = 0; i < labels.length; i++)
  {
   listbox.appendItem(labels[i], labels[i]);
  }
 },
 RemoveDimension: function(dimstr)
 {
  var dimensions = windosize_common.LoadFromPrefs();
  var newdimensions = [];
  for(var i = 0; i < dimensions.length; i++)
  {
   if(dimensions[i] !== dimstr)
    newdimensions[newdimensions.length++] = dimensions[i];
  }
  windosize_common.SaveToPrefs(newdimensions);
 },
 LoadLocaleStrings: function()
 {
  var bundleMgr = Components.classes['@mozilla.org/intl/stringbundle;1'].getService(Components.interfaces.nsIStringBundleService);
  var customizeStrBundle = bundleMgr.createBundle('chrome://windosize/locale/customize.properties');
  windosize_customize.localeDelete = customizeStrBundle.GetStringFromName('windosizeSelectItemToDelete');
  windosize_customize.localeSize   = customizeStrBundle.GetStringFromName('windosizeWidthHeight');
 },
 Delete: function()
 {
  var listbox = document.getElementById('windosize-customize-currentlist');
  if(listbox.selectedItem === null)
  {
   alert(windosize_customize.localeDelete);
   return;
  }
  windosize_customize.RemoveDimension(listbox.selectedItem.label);
  windosize_customize.ReloadCurrentList();
 },
 ListKeypress: function(evt)
 {
  if(evt.keyCode === 46)
  {
   windosize_customize.Delete();
   return false;
  }
  return true;
 },
 Add: function()
 {
  var width  = document.getElementById('windosize-customize-addwidth');
  var height = document.getElementById('windosize-customize-addheight');
  width.value.replace(/\D+/g, '');
  height.value.replace(/\D+/g, '');
  if(windosize_common.isEmpty(width.value) || windosize_common.isEmpty(height.value))
  {
   alert(windosize_customize.localeSize);
   return;
  }
  windosize_common.AddDimension(width.value, height.value);
  windosize_customize.ReloadCurrentList();
  width.value = '';
  height.value = '';
 },
 NumberOnly: function(evt)
 {
  if(evt.charCode === 0)
   return true; 
  if(String.fromCharCode(evt.charCode) >= '0' && String.fromCharCode(evt.charCode) <= '9')
   return true;
  return false;
 },
 DoOnLoad: function()
 {
  windosize_customize.LoadLocaleStrings();
  windosize_customize.ReloadCurrentList();
 }
};
window.addEventListener('load', windosize_customize.DoOnLoad, false);
