/**********
 * FILTERS (JavaScript)
 * **********/

// jQuery (START)
window.addEventListener('load', function() {

  // Hide all non JavaScript elements and show any JavaScript elements on load of the page
  
  // Hide all dynamic filter sections (i.e. all filter options)
  $('.dhsc-filter--content').hide();

  // Relabel the filter button to read 'Show filters' as part of progressive enhancement
  $('#dhsc-filter--button-content').html('Show filters');
  $('#dhsc-filter--button-content1').html('Show filters');
  $('#dhsc-filter--button-content2').html('Show filters');
  $('#dhsc-filter--button-content3').html('Show filters');
  $('#dhsc-filter--button-content4').html('Show filters');
  $('#dhsc-filter--button-content5').html('Show filters');
  $('#dhsc-filter--button-content6').html('Show filters');
  $('#dhsc-filter--button-content7').html('Show filters');
  $('#dhsc-filter--button-content8').html('Show filters');
  $('#dhsc-filter--button-content9').html('Show filters');
  $('#dhsc-filter--button-content10').html('Show filters');
  $('#dhsc-filter--button-content11').html('Show filters');
  $('#dhsc-filter--button-content12').html('Show filters');
  $('#dhsc-filter--button-content13').html('Show filters');
  $('#dhsc-filter--button-content14').html('Show filters');
  $('#dhsc-filter--button-content15').html('Show filters');
  $('#dhsc-filter--button-content16').html('Show filters');

  // Show the search box for searchable radios
  $('#radios-search').show();

  // Filter (#0 for GASCD): Care provider locations near postcode CO5 1ST for Shoggins Care Services Limited - User interacts with the filter button
  $('#dhsc-filter--button').on("click", function() {
    
    if (!$('#dhsc-filter--action').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content').show().focus();
      $('#dhsc-filter--action').addClass('dhsc-filter--open');
      $('#dhsc-filter--button').attr('aria-expanded', 'true');
      $("#dhsc-filter--button .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon').addClass('fa-minus');
      $('#dhsc-filter--icon').removeClass('fa-plus');
      $('#dhsc-filter--icon-content').text('Close');
    }
    else {
      $('#dhsc-filter--content').hide();
      $('#dhsc-filter--action').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button').attr('aria-expanded', 'false');
      $("#dhsc-filter--button .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon').addClass('fa-plus');
      $('#dhsc-filter--icon').removeClass('fa-minus');
      $('#dhsc-filter--icon-content').text('Open');
    }

  });
  
  /* Filter (#0 for GASCD): Care provider locations near postcode CO5 1ST for Shoggins Care Services Limited - Quick and dirty way of updating the filters individually, when a user clicks a related pill */

  // Postcode
  $('#postcode-remove').on("click", function(e) {
    e.preventDefault();
    $('#postcode').val('');
    $('#update-filters').click();
  });

  // Extra care housing housing
  $('#serviceType_1-remove').on("click", function(e) {
    e.preventDefault();
    $('#serviceType_1').prop("checked", false);
    $('#update-filters').click();
  });
  // Homecare agencies
  $('#serviceType_2-remove').on("click", function(e) {
    e.preventDefault();
    $('#serviceType_2').prop("checked", false);
    $('#update-filters').click();
  });
  // Nursing homes
  $('#serviceType_3-remove').on("click", function(e) {
    e.preventDefault();
    $('#serviceType_3').prop("checked", false);
    $('#update-filters').click();
  });
  // Residential homes
  $('#serviceType_4-remove').on("click", function(e) {
    e.preventDefault();
    $('#serviceType_4').prop("checked", false);
    $('#update-filters').click();
  });
  // Supported living
  $('#serviceType_5-remove').on("click", function(e) {
    e.preventDefault();
    $('#serviceType_5').prop("checked", false);
    $('#update-filters').click();
  });

  // Outstanding
  $('#cqcRating_1-remove').on("click", function(e) {
    e.preventDefault();
    $('#cqcRating_1').prop("checked", false);
    $('#update-filters').click();
  });
  // Good
  $('#cqcRating_2-remove').on("click", function(e) {
    e.preventDefault();
    $('#cqcRating_2').prop("checked", false);
    $('#update-filters').click();
  });
  // Requires improvement
  $('#cqcRating_3-remove').on("click", function(e) {
    e.preventDefault();
    $('#cqcRating_3').prop("checked", false);
    $('#update-filters').click();
  });
  // Inadequate
  $('#cqcRating_4-remove').on("click", function(e) {
    e.preventDefault();
    $('#cqcRating_4').prop("checked", false);
    $('#update-filters').click();
  });

  // Filter (#1 for GASCD): Care home bed numbers - User interacts with the filter button
  $('#dhsc-filter--button1').on("click", function() {
    
    if (!$('#dhsc-filter--action1').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content1').show().focus();
      $('#dhsc-filter--action1').addClass('dhsc-filter--open');
      $('#dhsc-filter--button1').attr('aria-expanded', 'true');
      $("#dhsc-filter--button1 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon1').addClass('fa-minus');
      $('#dhsc-filter--icon1').removeClass('fa-plus');
      $('#dhsc-filter--icon1-content').text('Close');
    }
    else {
      $('#dhsc-filter--content1').hide();
      $('#dhsc-filter--action1').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button1').attr('aria-expanded', 'false');
      $("#dhsc-filter--button1 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon1').addClass('fa-plus');
      $('#dhsc-filter--icon1').removeClass('fa-minus');
      $('#dhsc-filter--icon1-content').text('Open');
    }

  });

  // Filter (#2 for GASCD): Care home bed types - User interacts with the filter button
  $('#dhsc-filter--button2').on("click", function() {
    
    if (!$('#dhsc-filter--action2').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content2').show().focus();
      $('#dhsc-filter--action2').addClass('dhsc-filter--open');
      $('#dhsc-filter--button2').attr('aria-expanded', 'true');
      $("#dhsc-filter--button2 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon2').addClass('fa-minus');
      $('#dhsc-filter--icon2').removeClass('fa-plus');
      $('#dhsc-filter--icon2-content').text('Close');
    }
    else {
      $('#dhsc-filter--content2').hide();
      $('#dhsc-filter--action2').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button2').attr('aria-expanded', 'false');
      $("#dhsc-filter--button2 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon2').addClass('fa-plus');
      $('#dhsc-filter--icon2').removeClass('fa-minus');
      $('#dhsc-filter--icon2-content').text('Open');
    }

  });

  /* Filter (#2 for GASCD): Care home bed types - Quick and dirty way of updating the filters individually, when a user clicks a related pill */

  // All bed types
  $('#bedType2_1-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_1').prop("checked", false);
    $('#update-filters2').click();
  });
  // Community care bed
  $('#bedType2_2-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_2').prop("checked", false);
    $('#update-filters2').click();
  });
  // Dementia nursing
  $('#bedType2_3-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_3').prop("checked", false);
    $('#update-filters2').click();
  });
  // Dementia residential
  $('#bedType2_4-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_4').prop("checked", false);
    $('#update-filters2').click();
  });
  // General nursing
  $('#bedType2_5-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_5').prop("checked", false);
    $('#update-filters2').click();
  });
  // General residential
  $('#bedType2_6-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_6').prop("checked", false);
    $('#update-filters2').click();
  });
  // Learning disability nursing
  $('#bedType2_7-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_7').prop("checked", false);
    $('#update-filters2').click();
  });
  // Learning disability residential
  $('#bedType2_8-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_8').prop("checked", false);
    $('#update-filters2').click();
  });
  // Mental health nursing
  $('#bedType2_9-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_9').prop("checked", false);
    $('#update-filters2').click();
  });
  // Mental health residential
  $('#bedType2_10-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_10').prop("checked", false);
    $('#update-filters2').click();
  });
  // Transitional
  $('#bedType2_11-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_11').prop("checked", false);
    $('#update-filters2').click();
  });
  // Young physically disabled
  $('#bedType2_12-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType2_12').prop("checked", false);
    $('#update-filters2').click();
  });

  // Filter (#3 for GASCD): Care home bed numbers - trends over time - User interacts with the filter button 
  $('#dhsc-filter--button3').on("click", function() {
    
    if (!$('#dhsc-filter--action3').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content3').show().focus();
      $('#dhsc-filter--action3').addClass('dhsc-filter--open');
      $('#dhsc-filter--button3').attr('aria-expanded', 'true');
      $("#dhsc-filter--button3 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon3').addClass('fa-minus');
      $('#dhsc-filter--icon3').removeClass('fa-plus');
      $('#dhsc-filter--icon3-content').text('Close');
    }
    else {
      $('#dhsc-filter--content3').hide();
      $('#dhsc-filter--action3').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button3').attr('aria-expanded', 'false');
      $("#dhsc-filter--button3 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon3').addClass('fa-plus');
      $('#dhsc-filter--icon3').removeClass('fa-minus');
      $('#dhsc-filter--icon3-content').text('Open');
    }

  });

  /* Filter (#3 for GASCD): Care home bed numbers - trends over time - Quick and dirty way of updating the filters individually, when a user clicks a related pill */

  // All bed types
  $('#bedType3_1-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_1').prop("checked", false);
    $('#update-filters3').click();
  });
  // Community care bed
  $('#bedType3_2-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_2').prop("checked", false);
    $('#update-filters3').click();
  });
  // Dementia nursing
  $('#bedType3_3-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_3').prop("checked", false);
    $('#update-filters3').click();
  });
  // Dementia residential
  $('#bedType3_4-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_4').prop("checked", false);
    $('#update-filters3').click();
  });
  // General nursing
  $('#bedType3_5-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_5').prop("checked", false);
    $('#update-filters3').click();
  });
  // General residential
  $('#bedType3_6-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_6').prop("checked", false);
    $('#update-filters3').click();
  });
  // Learning disability nursing
  $('#bedType3_7-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_7').prop("checked", false);
    $('#update-filters3').click();
  });
  // Learning disability residential
  $('#bedType3_8-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_8').prop("checked", false);
    $('#update-filters3').click();
  });
  // Mental health nursing
  $('#bedType3_9-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_9').prop("checked", false);
    $('#update-filters3').click();
  });
  // Mental health residential
  $('#bedType3_10-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_10').prop("checked", false);
    $('#update-filters3').click();
  });
  // Transitional
  $('#bedType3_11-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_11').prop("checked", false);
    $('#update-filters3').click();
  });
  // Young physically disabled
  $('#bedType3_12-remove').on("click", function(e) {
    e.preventDefault();
    $('#bedType3_12').prop("checked", false);
    $('#update-filters3').click();
  });
  
  // Filter (#4 for GASCD): Age group percentages at district and Middle Layer Super Output Area (MSOA) level) - User interacts with the filter button
  $('#dhsc-filter--button4').on("click", function() {
    
    if (!$('#dhsc-filter--action4').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content4').show().focus();
      $('#dhsc-filter--action4').addClass('dhsc-filter--open');
      $('#dhsc-filter--button4').attr('aria-expanded', 'true');
      $("#dhsc-filter--button4 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon4').addClass('fa-minus');
      $('#dhsc-filter--icon4').removeClass('fa-plus');
      $('#dhsc-filter--icon4-content').text('Close');
    }
    else {
      $('#dhsc-filter--content4').hide();
      $('#dhsc-filter--action4').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button4').attr('aria-expanded', 'false');
      $("#dhsc-filter--button4 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon4').addClass('fa-plus');
      $('#dhsc-filter--icon4').removeClass('fa-minus');
      $('#dhsc-filter--icon4-content').text('Open');
    }

  });

  // Filter (#5 for GASCD): Age group percentages for regional local authorities) - User interacts with the filter button
  $('#dhsc-filter--button5').on("click", function() {
    
    if (!$('#dhsc-filter--action5').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content5').show().focus();
      $('#dhsc-filter--action5').addClass('dhsc-filter--open');
      $('#dhsc-filter--button5').attr('aria-expanded', 'true');
      $("#dhsc-filter--button5 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon5').addClass('fa-minus');
      $('#dhsc-filter--icon5').removeClass('fa-plus');
      $('#dhsc-filter--icon5-content').text('Close');
    }
    else {
      $('#dhsc-filter--content5').hide();
      $('#dhsc-filter--action5').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button5').attr('aria-expanded', 'false');
      $("#dhsc-filter--button5 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon5').addClass('fa-plus');
      $('#dhsc-filter--icon5').removeClass('fa-minus');
      $('#dhsc-filter--icon5-content').text('Open');
    }

  });

  /* Filter (#5 for GASCD): Age group percentages for regional local authorities - Quick and dirty way of updating the filters individually, when a user clicks a related pill */

  // 18 to 64
  $('#ageGroup5_1-remove').on("click", function(e) {
    e.preventDefault();
    $('#ageGroup5_1').prop("checked", false);
    $('#update-filters5').click();
  });
  // 65 to 74
  $('#ageGroup5_2-remove').on("click", function(e) {
    e.preventDefault();
    $('#ageGroup5_2').prop("checked", false);
    $('#update-filters5').click();
  });
  // 75 to 84
  $('#ageGroup5_3-remove').on("click", function(e) {
    e.preventDefault();
    $('#ageGroup5_3').prop("checked", false);
    $('#update-filters5').click();
  });
  // 85 and over
  $('#ageGroup5_4-remove').on("click", function(e) {
    e.preventDefault();
    $('#ageGroup5_4').prop("checked", false);
    $('#update-filters5').click();
  });

  // Page filter (#6 for GASCD) - User interacts with the filter button
  $('#dhsc-filter--button6').on("click", function() {
    
    if (!$('#dhsc-filter--action6').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content6').show().focus();
      $('#dhsc-filter--action6').addClass('dhsc-filter--open');
      $('#dhsc-filter--button6').attr('aria-expanded', 'true');
      $("#dhsc-filter--button6 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon6').addClass('fa-minus');
      $('#dhsc-filter--icon6').removeClass('fa-plus');
      $('#dhsc-filter--icon6-content').text('Close');
    }
    else {
      $('#dhsc-filter--content6').hide();
      $('#dhsc-filter--action6').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button6').attr('aria-expanded', 'false');
      $("#dhsc-filter--button6 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon6').addClass('fa-plus');
      $('#dhsc-filter--icon6').removeClass('fa-minus');
      $('#dhsc-filter--icon6-content').text('Open');
    }

  });

  // Page filter (#6 for GASCD) - Quick and dirty way of updating the filters individually, when a user clicks a related pill

  // Local authority
  $('#localAuthority6-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority6').val('Suffolk');
    $('#update-filters6').click();
  });

  // Page filter (#7 for GASCD) - User interacts with the filter button
  $('#dhsc-filter--button7').on("click", function() {
    
    if (!$('#dhsc-filter--action7').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content7').show().focus();
      $('#dhsc-filter--action7').addClass('dhsc-filter--open');
      $('#dhsc-filter--button7').attr('aria-expanded', 'true');
      $("#dhsc-filter--button7 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon7').addClass('fa-minus');
      $('#dhsc-filter--icon7').removeClass('fa-plus');
      $('#dhsc-filter--icon7-content').text('Close');
    }
    else {
      $('#dhsc-filter--content7').hide();
      $('#dhsc-filter--action7').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button7').attr('aria-expanded', 'false');
      $("#dhsc-filter--button7 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon7').addClass('fa-plus');
      $('#dhsc-filter--icon7').removeClass('fa-minus');
      $('#dhsc-filter--icon7-content').text('Open');
    }

  });

  // Page filter (#7 for GASCD) - Quick and dirty way of updating the filters individually, when a user clicks a related pill

  // Local authority
  $('#localAuthority7-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority7').val('Suffolk');
    $('#update-filters7').click();
  });
  
  // Filter (#8 for GASCD): Primary reason for people to access long-term adult social care - User interacts with the filter button
  $('#dhsc-filter--button8').on("click", function() {
    
    if (!$('#dhsc-filter--action8').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content8').show().focus();
      $('#dhsc-filter--action8').addClass('dhsc-filter--open');
      $('#dhsc-filter--button8').attr('aria-expanded', 'true');
      $("#dhsc-filter--button8 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon8').addClass('fa-minus');
      $('#dhsc-filter--icon8').removeClass('fa-plus');
      $('#dhsc-filter--icon8-content').text('Close');
    }
    else {
      $('#dhsc-filter--content8').hide();
      $('#dhsc-filter--action8').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button8').attr('aria-expanded', 'false');
      $("#dhsc-filter--button8 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon8').addClass('fa-plus');
      $('#dhsc-filter--icon8').removeClass('fa-minus');
      $('#dhsc-filter--icon8-content').text('Open');
    }

  });

  /* Filter (#8 for GASCD): Primary reason for people to access long-term adult social care - Quick and dirty way of updating the filters individually, when a user clicks a related pill */

  // Age group
  $('#ageGroup8-remove').on("click", function(e) {
    e.preventDefault();
    $('#ageGroup8_1').prop("checked", true);
    $('#ageGroup8_2').prop("checked", false);
    $('#ageGroup8_3').prop("checked", false);
    $('#update-filters8').click();
  });

  // Learning disability support
  $('#primarySupportReason8_1-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_1').prop("checked", false);
    $('#update-filters8').click();
  });
  // Mental health support
  $('#primarySupportReason8_2-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_2').prop("checked", false);
    $('#update-filters8').click();
  });
  // Physical support: Access and mobility only
  $('#primarySupportReason8_3-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_3').prop("checked", false);
    $('#update-filters8').click();
  });
  // Physical support: Personal care support
  $('#primarySupportReason8_4-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_4').prop("checked", false);
    $('#update-filters8').click();
  });
  // Sensory support: Support for dual impairment
  $('#primarySupportReason8_5-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_5').prop("checked", false);
    $('#update-filters8').click();
  });
  // Sensory support: Support for hearing impairment
  $('#primarySupportReason8_6-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_6').prop("checked", false);
    $('#update-filters8').click();
  });
  // Sensory support: Support for visual impairment
  $('#primarySupportReason8_7-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_7').prop("checked", false);
    $('#update-filters8').click();
  });
  // Social support: Asylum seeker support
  $('#primarySupportReason8_8-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_8').prop("checked", false);
    $('#update-filters8').click();
  });
  // Social support: Substance misuse support
  $('#primarySupportReason8_9-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_9').prop("checked", false);
    $('#update-filters8').click();
  });
  // Social support: Support for social isolation or other reason
  $('#primarySupportReason8_10-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_10').prop("checked", false);
    $('#update-filters8').click();
  });
  // Support with memory and cognition
  $('#primarySupportReason8_11-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_11').prop("checked", false);
    $('#update-filters8').click();
  });
  // Unknown
  $('#primarySupportReason8_12-remove').on("click", function(e) {
    e.preventDefault();
    $('#primarySupportReason8_12').prop("checked", false);
    $('#update-filters8').click();
  });

  // Page filter (#9 for GASCD) - User interacts with the filter button
  $('#dhsc-filter--button9').on("click", function() {
    
    if (!$('#dhsc-filter--action9').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content9').show().focus();
      $('#dhsc-filter--action9').addClass('dhsc-filter--open');
      $('#dhsc-filter--button9').attr('aria-expanded', 'true');
      $("#dhsc-filter--button9 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon9').addClass('fa-minus');
      $('#dhsc-filter--icon9').removeClass('fa-plus');
      $('#dhsc-filter--icon9-content').text('Close');
    }
    else {
      $('#dhsc-filter--content9').hide();
      $('#dhsc-filter--action9').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button9').attr('aria-expanded', 'false');
      $("#dhsc-filter--button9 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon9').addClass('fa-plus');
      $('#dhsc-filter--icon9').removeClass('fa-minus');
      $('#dhsc-filter--icon9-content').text('Open');
    }

  });

  // Page filter (#9 for GASCD) - Quick and dirty way of updating the filters individually, when a user clicks a related pill

  // Local authority
  $('#localAuthority9-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority9').val('Suffolk');
    $('#update-filters9').click();
  });

  // Page filter (#10 for GASCD) - User interacts with the filter button
  $('#dhsc-filter--button10').on("click", function() {
    
    if (!$('#dhsc-filter--action10').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content10').show().focus();
      $('#dhsc-filter--action10').addClass('dhsc-filter--open');
      $('#dhsc-filter--button10').attr('aria-expanded', 'true');
      $("#dhsc-filter--button10 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon10').addClass('fa-minus');
      $('#dhsc-filter--icon10').removeClass('fa-plus');
      $('#dhsc-filter--icon10-content').text('Close');
    }
    else {
      $('#dhsc-filter--content10').hide();
      $('#dhsc-filter--action10').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button10').attr('aria-expanded', 'false');
      $("#dhsc-filter--button10 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon10').addClass('fa-plus');
      $('#dhsc-filter--icon10').removeClass('fa-minus');
      $('#dhsc-filter--icon10-content').text('Open');
    }

  });

  // Page filter (#10 for GASCD) - Quick and dirty way of updating the filters individually, when a user clicks a related pill
  
  // Local authority
  $('#localAuthority10-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority10').val('Suffolk');
    $('#update-filters10').click();
  });

  // Page filter (#11 for GASCD) - User interacts with the filter button
  $('#dhsc-filter--button11').on("click", function() {
    
    if (!$('#dhsc-filter--action11').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content11').show().focus();
      $('#dhsc-filter--action11').addClass('dhsc-filter--open');
      $('#dhsc-filter--button11').attr('aria-expanded', 'true');
      $("#dhsc-filter--button11 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon11').addClass('fa-minus');
      $('#dhsc-filter--icon11').removeClass('fa-plus');
      $('#dhsc-filter--icon11-content').text('Close');
    }
    else {
      $('#dhsc-filter--content11').hide();
      $('#dhsc-filter--action11').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button11').attr('aria-expanded', 'false');
      $("#dhsc-filter--button11 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon11').addClass('fa-plus');
      $('#dhsc-filter--icon11').removeClass('fa-minus');
      $('#dhsc-filter--icon11-content').text('Open');
    }

  });

  // Page filter (#11 for GASCD) - Quick and dirty way of updating the filters individually, when a user clicks a related pill

  // Local authority
  $('#localAuthority11-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority11').val('Suffolk');
    $('#update-filters11').click();
  });
  
  // Page filter (#12 for GASCD) - User interacts with the filter button
  $('#dhsc-filter--button12').on("click", function() {
    
    if (!$('#dhsc-filter--action12').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content12').show().focus();
      $('#dhsc-filter--action12').addClass('dhsc-filter--open');
      $('#dhsc-filter--button12').attr('aria-expanded', 'true');
      $("#dhsc-filter--button12 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon12').addClass('fa-minus');
      $('#dhsc-filter--icon12').removeClass('fa-plus');
      $('#dhsc-filter--icon12-content').text('Close');
    }
    else {
      $('#dhsc-filter--content12').hide();
      $('#dhsc-filter--action12').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button12').attr('aria-expanded', 'false');
      $("#dhsc-filter--button12 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon12').addClass('fa-plus');
      $('#dhsc-filter--icon12').removeClass('fa-minus');
      $('#dhsc-filter--icon12-content').text('Open');
    }

  });

  // Page filter (#12 for GASCD) - Quick and dirty way of updating the filters individually, when a user clicks a related pill

  // Local authority
  $('#localAuthority12-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority12').val('Suffolk');
    $('#update-filters12').click();
  });
  
  // Filter (#13 for GASCD): Number of adult social care providers - User interacts with the filter button
  $('#dhsc-filter--button13').on("click", function() {
    
    if (!$('#dhsc-filter--action13').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content13').show().focus();
      $('#dhsc-filter--action13').addClass('dhsc-filter--open');
      $('#dhsc-filter--button13').attr('aria-expanded', 'true');
      $("#dhsc-filter--button13 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon13').addClass('fa-minus');
      $('#dhsc-filter--icon13').removeClass('fa-plus');
      $('#dhsc-filter--icon13-content').text('Close');
    }
    else {
      $('#dhsc-filter--content13').hide();
      $('#dhsc-filter--action13').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button13').attr('aria-expanded', 'false');
      $("#dhsc-filter--button13 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon13').addClass('fa-plus');
      $('#dhsc-filter--icon13').removeClass('fa-minus');
      $('#dhsc-filter--icon13-content').text('Open');
    }

  });

  // Filter (#13 for GASCD): Number of adult social care providers - Quick and dirty way of updating the filters individually, when a user clicks a related pill

  // Local authority
  $('#localAuthority13-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority13').val('Suffolk');
    $('#update-filters13').click();
  });

  // Page filter (#15 for GASCD) - User interacts with the filter button
  $('#dhsc-filter--button15').on("click", function() {
    
    if (!$('#dhsc-filter--action15').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content15').show().focus();
      $('#dhsc-filter--action15').addClass('dhsc-filter--open');
      $('#dhsc-filter--button15').attr('aria-expanded', 'true');
      $("#dhsc-filter--button15 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon15').addClass('fa-minus');
      $('#dhsc-filter--icon15').removeClass('fa-plus');
      $('#dhsc-filter--icon15-content').text('Close');
    }
    else {
      $('#dhsc-filter--content15').hide();
      $('#dhsc-filter--action15').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button15').attr('aria-expanded', 'false');
      $("#dhsc-filter--button15 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon15').addClass('fa-plus');
      $('#dhsc-filter--icon15').removeClass('fa-minus');
      $('#dhsc-filter--icon15-content').text('Open');
    }

  });

  // Page filter (#14 for GASCD) - User interacts with the filter button
  $('#dhsc-filter--button14').on("click", function() {
    
    if (!$('#dhsc-filter--action14').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content14').show().focus();
      $('#dhsc-filter--action14').addClass('dhsc-filter--open');
      $('#dhsc-filter--button14').attr('aria-expanded', 'true');
      $("#dhsc-filter--button14 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon14').addClass('fa-minus');
      $('#dhsc-filter--icon14').removeClass('fa-plus');
      $('#dhsc-filter--icon14-content').text('Close');
    }
    else {
      $('#dhsc-filter--content14').hide();
      $('#dhsc-filter--action14').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button14').attr('aria-expanded', 'false');
      $("#dhsc-filter--button14 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon14').addClass('fa-plus');
      $('#dhsc-filter--icon14').removeClass('fa-minus');
      $('#dhsc-filter--icon14-content').text('Open');
    }

  });

  // Page filter (#14 for GASCD) - Quick and dirty way of updating the filters individually, when a user clicks a related pill

  // Local authority
  $('#localAuthority14-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority14').val('Suffolk');
    $('#update-filters14').click();
  });
  // Age group

  $('#ageGroup14-remove').on("click", function(e) {
    e.preventDefault();
    $('#ageGroup14_1').prop("checked", true);
    $('#ageGroup14_2').prop("checked", false);
    $('#ageGroup14_3').prop("checked", false);
    $('#update-filters14').click();
  });

  // Page filter (#15 for GASCD) - Quick and dirty way of updating the filters individually, when a user clicks a related pill

  // Local authority
  $('#localAuthority15-remove').on("click", function(e) {
    e.preventDefault();
    $('#localAuthority15').val('Suffolk');
    $('#update-filters15').click();
  });

  // Filter (#16 for GASCD): Local authority funding for long-term adult social care – trends over time - User interacts with the filter button
  $('#dhsc-filter--button16').on("click", function() {
    
    if (!$('#dhsc-filter--action16').hasClass('dhsc-filter--open')) {
      $('#dhsc-filter--content16').show().focus();
      $('#dhsc-filter--action16').addClass('dhsc-filter--open');
      $('#dhsc-filter--button16').attr('aria-expanded', 'true');
      $("#dhsc-filter--button16 .dhsc-filter--button-content").text('Hide filters');
      $('#dhsc-filter--icon16').addClass('fa-minus');
      $('#dhsc-filter--icon16').removeClass('fa-plus');
      $('#dhsc-filter--icon16-content').text('Close');
    }
    else {
      $('#dhsc-filter--content16').hide();
      $('#dhsc-filter--action16').removeClass('dhsc-filter--open');
      $('#dhsc-filter--button16').attr('aria-expanded', 'false');
      $("#dhsc-filter--button16 .dhsc-filter--button-content").text('Show filters');
      $('#dhsc-filter--icon16').addClass('fa-plus');
      $('#dhsc-filter--icon16').removeClass('fa-minus');
      $('#dhsc-filter--icon16-content').text('Open');
    }

  });

  /* Filter (#16 for GASCD): Local authority funding for long-term adult social care – trends over time - Quick and dirty way of updating the filters individually, when a user clicks a related pill */

  // Support setting
  $('#supportSetting16-remove').on("click", function(e) {
    e.preventDefault();
    $('#supportSetting16 option[value=All types of adult social care]').prop("checked", true);
    $('#update-filters16').click();
  });

});
// jQuery (END)

// JavaScript (START)
(function () {
    
  var filterInput = document.getElementById('input-bedtype-radios');
  
  if (!filterInput) return;

  var radiosContainer = document.getElementById('radios-status');
  
  if (!radiosContainer) return;

  var items = Array.prototype.slice.call(
    radiosContainer.querySelectorAll('.govuk-radios__item')
  );

  filterInput.addEventListener('keyup', function () {

    var query = filterInput.value.toLowerCase().trim();

    items.forEach(function (item) {
      
      var labelEl = item.querySelector('label');
      var text = labelEl ? labelEl.innerText.toLowerCase() : '';
      var match = text.indexOf(query) !== -1;

      item.style.display = match ? '' : 'none';
    });

  });
  
})();
// JavaScript (END)