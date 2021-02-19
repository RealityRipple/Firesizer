var windosize_common = {
 LoadFromPrefs: function()
 {
  var prefMgr = Components.classes['@mozilla.org/preferences-service;1'].
   getService(Components.interfaces.nsIPrefService);
  var prefs = prefMgr.getBranch('extensions.windosize.dimensionlist.');
  var dimensionlist = prefs.getCharPref('outer');
  var dimensions = dimensionlist.split(';');
  dimensions.sort(windosize_common.SortByLabel);
  return dimensions;
 },
 SaveToPrefs: function(dimensions)
 {
  dimensions = windosize_common.deDupe(dimensions);
  dimensions.sort(windosize_common.SortByLabel);
  var prefMgr = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefService);
  var prefs = prefMgr.getBranch('extensions.windosize.dimensionlist.');
  prefs.setCharPref('outer', dimensions.join(';'));
 },
 AddDimension: function(width, height)
 {
  var dimensions = windosize_common.LoadFromPrefs();
  dimensions[dimensions.length++] = width + 'x' + height;
  windosize_common.SaveToPrefs(dimensions);
 },
 SortByLabel: function(a, b)
 {
  var aSqPx = windosize_common.getSqPx(a);
  var bSqPx = windosize_common.getSqPx(b);
  if(aSqPx > bSqPx)
   return 1;
  else if(aSqPx < bSqPx)
   return -1;
  return 0;
 },
 deDupe: function(dimensions)
 {
  var unique = {};
  for(var i = 0; i < dimensions.length; i++)
  {
   unique[dimensions[i]] = 1;
  }
  var result = [];
  for(var dim in unique)
  {
   result[result.length++] = dim;
  }
  return result;
 },
 getSqPx: function(dimstr)
 {
  var dim = dimstr.split('x');
  return Number(dim[0]) * Number(dim[1]);
 },
 isEmpty: function(str)
 {
  if(str === null || str === '')
   return true; 
  return false;
 }
};
