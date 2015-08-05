$ ->

  csrf_token = $('meta[name="csrf-token"]').attr('content');
  $.ajaxSetup
    beforeSend: (xhr, settings) ->
      alert("send")
      return if (settings.type is "GET")
      xhr.setRequestHeader('X-CSRF-Token', csrf_token) if csrf_token