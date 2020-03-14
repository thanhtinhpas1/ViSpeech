/* eslint-disable */

/*! Template: TokenWiz v1.0.2 */
!(function(e) {
  // 'use strict'
  var t = e(window)
  var a = e('body')
  var o = e(document)
  function i() {
    return t.width()
  }
  'ontouchstart' in document.documentElement || a.addClass('no-touch')
  var l = i()
  t.on('resize', function() {
    l = i()
  })
  var n = e('.is-sticky')
  var s = e('.topbar')
  var r = e('.topbar-wrap')
  if (n.length > 0) {
    var c = n.offset()
    t.scroll(function() {
      var e = t.scrollTop()
      var a = s.height()
      e > c.top
        ? n.hasClass('has-fixed') ||
          (n.addClass('has-fixed'), r.css('padding-top', a))
        : n.hasClass('has-fixed') &&
          (n.removeClass('has-fixed'), r.css('padding-top', 0))
    })
  }
  var d = e('[data-percent]')
  d.length > 0 &&
    d.each(function() {
      var t = e(this)
      var a = t.data('percent')
      t.css('width', `${a}%`)
    })
  var p = window.location.href
  var g = p.split('#')
  var f = e('a')
  f.length > 0 &&
    f.each(function() {
      p === this.href &&
        g[1] !== '' &&
        e(this)
          .closest('li')
          .addClass('active')
          .parent()
          .closest('li')
          .addClass('active')
    })
  var h = e('.countdown-clock')
  h.length > 0 &&
    h.each(function() {
      var t = e(this)
      var a = t.attr('data-date')
      t.countdown(a).on('update.countdown', function(t) {
        e(this).html(
          t.strftime(
            '<div><span class="countdown-time countdown-time-first">%D</span><span class="countdown-text">Day</span></div><div><span class="countdown-time">%H</span><span class="countdown-text">Hour</span></div><div><span class="countdown-time">%M</span><span class="countdown-text">Min</span></div><div><span class="countdown-time countdown-time-last">%S</span><span class="countdown-text">Sec</span></div>'
          )
        )
      })
    })
  var u = e('.select')
  u.length > 0 &&
    u.each(function() {
      e(this).select2({ theme: 'flat' })
    })
  var m = e('.select-bordered')
  m.length > 0 &&
    m.each(function() {
      e(this).select2({ theme: 'flat bordered' })
    })
  var v = '.toggle-tigger'
  var b = '.toggle-class'
  e(v).length > 0 &&
    o.on('click', v, function(t) {
      var a = e(this)
      e(v)
        .not(a)
        .removeClass('active'),
        e(b)
          .not(a.parent().children())
          .removeClass('active'),
        a
          .toggleClass('active')
          .parent()
          .find(b)
          .toggleClass('active'),
        t.preventDefault()
    }),
    o.on('click', 'body', function(t) {
      var a = e(v)
      var o = e(b)
      o.is(t.target) ||
        o.has(t.target).length !== 0 ||
        a.is(t.target) ||
        a.has(t.target).length !== 0 ||
        (o.removeClass('active'), a.removeClass('active'))
    })
  var x = e('.toggle-nav')
  var y = e('.navbar')
  function C(e) {
    l < 991
      ? e.delay(500).addClass('navbar-mobile')
      : e.delay(500).removeClass('navbar-mobile')
  }
  x.length > 0 &&
    x.on('click', function(e) {
      x.toggleClass('active'), y.toggleClass('active'), e.preventDefault()
    }),
    o.on('click', 'body', function(e) {
      x.is(e.target) ||
        x.has(e.target).length !== 0 ||
        y.is(e.target) ||
        y.has(e.target).length !== 0 ||
        (x.removeClass('active'), y.removeClass('active'))
    }),
    C(y),
    t.on('resize', function() {
      C(y)
    })
  var k = e('[data-toggle="tooltip"]')
  k.length > 0 && k.tooltip()
  var w = e('.date-picker')
  var T = e('.date-picker-dob')
  var S = e('.time-picker')
  function _(t, a) {
    a === 'success'
      ? e(t)
          .parent()
          .find('.copy-feedback')
          .text('Copied to Clipboard')
          .fadeIn()
          .delay(1e3)
          .fadeOut()
      : e(t)
          .parent()
          .find('.copy-feedback')
          .text('Faild to Copy')
          .fadeIn()
          .delay(1e3)
          .fadeOut()
  }
  w.length > 0 &&
    w.each(function() {
      e(this).datepicker({
        format: 'dd/mm/yyyy',
        maxViewMode: 2,
        clearBtn: !0,
        autoclose: !0,
        todayHighlight: !0,
      })
    }),
    T.length > 0 &&
      T.each(function() {
        e(this).datepicker({
          format: 'dd/mm/yyyy',
          startView: 2,
          maxViewMode: 2,
          clearBtn: !0,
          autoclose: !0,
        })
      }),
    S.length > 0 &&
      S.each(function() {
        e(this)
          .parent()
          .addClass('has-timepicker'),
          e(this).timepicker({ timeFormat: 'HH:mm', interval: 15 })
      }),
    new window.ClipboardJS('.copy-clipboard')
      .on('success', function(e) {
        _(e.trigger, 'success'), e.clearSelection()
      })
      .on('error', function(e) {
        _(e.trigger, 'fail')
      }),
    new window.ClipboardJS('.copy-clipboard-modal', {
      container: document.querySelector('.modal'),
    })
      .on('success', function(e) {
        _(e.trigger, 'success'), e.clearSelection()
      })
      .on('error', function(e) {
        _(e.trigger, 'fail')
      })
  var D = e('.input-file')
  D.length > 0 &&
    D.each(function() {
      var t = e(this)
      var a = e(this).next()
      var o = e(this)
        .next()
        .text()
      t.on('change', function() {
        var e = t.val()
        a.html(e), a.is(':empty') && a.html(o)
      })
    })
  var L = e('.upload-zone')
  L.length > 0 &&
    ((window.Dropzone.autoDiscover = !1),
    L.each(function() {
      e(this)
        .addClass('dropzone')
        .dropzone({ url: '/images' })
    }))
  var z = e('.image-popup')
  z.length > 0 &&
    z.magnificPopup({
      type: 'image',
      preloader: !0,
      removalDelay: 400,
      mainClass: 'mfp-fade',
    })
  // var A = e('.dt-init')
  // A.length > 0 &&
  //   A.DataTable({
  //     ordering: !1,
  //     autoWidth: !1,
  //     dom:
  //       '<t><"row align-items-center"<"col-sm-6 text-left"p><"col-sm-6 text-sm-right"i>>',
  //     pageLength: 5,
  //     // bPaginate: e('.data-table tbody tr').length > 5,
  //     // iDisplayLength: 5,
  //     language: {
  //       search: '',
  //       // searchPlaceholder: 'Type in to Search',
  //       info: 'Hiển thị _START_ đến _END_ trên _TOTAL_ dòng',
  //       infoEmpty: 'Không có dữ liệu',
  //       infoFiltered: '(filtered from _MAX_ total entries)',
  //       paginate: {
  //         first: 'Trang đầu',
  //         last: 'Trang cuối',
  //         next: 'Tiếp theo',
  //         previous: 'Quay lại',
  //       },
  //     },
  //   })
  // var O = e('.dt-filter-init')
  // if (O.length > 0) {
  //   var P = O.DataTable({
  //     ordering: !1,
  //     autoWidth: !1,
  //     dom:
  //       '<"row justify-content-between pdb-1x"<"col-9 col-sm-6 text-left"f><"col-3 text-right"<"data-table-filter relative d-inline-block">>><t><"row align-items-center"<"col-sm-6 text-left"p><"col-sm-6 text-sm-right"i>>',
  //     pageLength: 6,
  //     bPaginate: e('.data-table tbody tr').length > 6,
  //     iDisplayLength: 6,
  //     language: {
  //       search: '',
  //       searchPlaceholder: 'Type in to Search',
  //       info: '_START_ -_END_ of _TOTAL_',
  //       infoEmpty: 'No records',
  //       infoFiltered: '( Total _MAX_  )',
  //       paginate: {
  //         first: 'First',
  //         last: 'Last',
  //         next: 'Next',
  //         previous: 'Prev',
  //       },
  //     }
  //   })
  //   e('.data-table-filter').append(
  //     '<a href="#" class="btn btn-light-alt btn-xs btn-icon toggle-tigger"> <em class="ti ti-settings"></em> </a><div class="toggle-class toggle-datatable-filter dropdown-content dropdown-content-top-left text-left"><ul class="pdt-1x pdb-1x"><li class="pd-1x pdl-2x pdr-2x"> <input class="data-filter input-checkbox input-checkbox-sm" type="radio" name="filter" id="all" checked value=""> <label for="all">All</label></li><li class="pd-1x pdl-2x pdr-2x"> <input class="data-filter input-checkbox input-checkbox-sm" type="radio" name="filter" id="approved" value="approved"> <label for="approved">Approved</label></li><li class="pd-1x pdl-2x pdr-2x"> <input class="data-filter input-checkbox input-checkbox-sm" type="radio" name="filter" value="pending" id="pending"> <label for="pending">Pending</label></li><li class="pd-1x pdl-2x pdr-2x"> <input class="data-filter input-checkbox input-checkbox-sm" type="radio" name="filter" value="progress" id="progress"> <label for="progress">Progress</label></li><li class="pd-1x pdl-2x pdr-2x"> <input class="data-filter input-checkbox input-checkbox-sm" type="radio" name="filter" value="cancled" id="cancled"> <label for="cancled">Cancled</label></li></ul></div>'
  //   ),
  //     e('.data-filter').on('change', function() {
  //       var t = e(this).val()
  //       P.columns('.dt-tnxno')
  //         .search(t || '', !0, !1)
  //         .draw()
  //     })
  // }
  e('.modal').on('shown.bs.modal', function() {
    a.hasClass('modal-open') || a.addClass('modal-open')
  })
  var H = e('.drop-toggle')
  H.length > 0 &&
    H.on('click', function(a) {
      t.width() < 991 &&
        (e(this)
          .parent()
          .children('.navbar-dropdown')
          .slideToggle(400),
        e(this)
          .parent()
          .siblings()
          .children('.navbar-dropdown')
          .slideUp(400),
        e(this)
          .parent()
          .toggleClass('current'),
        e(this)
          .parent()
          .siblings()
          .removeClass('current'),
        a.preventDefault())
    })
  // var M = e('.color-trigger')
  // M.length > 0 &&
  //   M.on('click', function() {
  //     var t = e(this).attr('title')
  //     return (
  //       e('body').fadeOut(function() {
  //         e('#layoutstyle').attr(
  //           'href',
  //           `%PUBLIC_URL%/assets/css/customer/${t}.css`
  //         ),
  //           e(this)
  //             .delay(150)
  //             .fadeIn()
  //       }),
  //       !1
  //     )
  //   })
})(jQuery)
