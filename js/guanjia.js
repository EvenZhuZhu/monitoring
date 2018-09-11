$(function () {
    //切换中间内容
    var index = 0
    // var timer = null;
    var func = function () {
      index++;
      if (index > 1) {
        index = 0
      }
      if (index == 0) {
        $('.imgs li').eq(0).fadeIn().siblings('li').fadeOut()
        $('.circle li').eq(0).addClass('current').siblings('li').removeClass('current')
      } else {
        $('.imgs li').eq(1).fadeIn().siblings('li').fadeOut()
        $('.circle li').eq(1).addClass('current').siblings('li').removeClass('current')
      }
    }
    setInterval(func, 8000)
    
    // $('.col2-top').mouseleave()
    //
    // $('.col2-top').mouseenter(function () {
    //   clearInterval(timer);
    // })
    // $('.col2-top').mouseleave(function () {
    //   timer = setInterval(func, 3000)
    // })
    
    
    $('.btn div').eq(0).click(function () {
      $('body,html').animate({'scrollTop': 1000}, 1000);
      $('.imgs li').eq(0).fadeIn().siblings('li').fadeOut()
      $('.circle li').eq(0).addClass('current').siblings('li').removeClass('current')
    })
    
    
    $('.btn div').eq(1).click(function () {
      $('body,html').animate({'scrollTop': 1000}, 1000);
      $('.imgs li').eq(1).fadeIn().siblings('li').fadeOut()
      $('.circle li').eq(1).addClass('current').siblings('li').removeClass('current')
    })
    
    
    //验证手机输入格式
    $('.zixun .ljzx').click(function () {
      if (!$('.phoneNum').val().trim()) {
        alert('请输入手机号')
      } else if ($('.phoneNum').val().trim().search(/^1[0-9]{10}$/) == 0) {
        $('.mask').css('display', 'block');
        var text = $('.phoneNum').val().trim()
        $('.mask .inner .ph').val(text);
      } else {
        alert('请输入正确的手机号')
      }
    })
    
    
    var code;
    var countdown = 60;
    var timer = null;
    
    function settime() {
      if (countdown == 0) {
        $(".yzm").attr("disabled", false);
        $(".yzm").html("获取验证码");
        code = ''
        // console.log(code);
        countdown = 60;
        return false;
      } else {
        $(".yzm").attr("disabled", true);
        $(".yzm").html(countdown + "秒后重新获取");
        countdown--;
        
      }
      timer = setTimeout(function () {
        settime();
      }, 1000);
    }
    
    
    $('.mask .inner .yzm').click(function () {
      if (!$('.ph').val().trim()) {
        alert('请输入手机号')
      } else if ($('.ph').val().trim().search(/^1[0-9]{10}$/) == 0) {
        $.ajax({
          async: true,
          url: "http://crmv2.86sb.com/system-app/send-message?mobile=" + $('.phoneNum').val() + "",
          type: "GET",
          success: function (res) {
            code = JSON.parse(res).data.code;
            // console.log(code);
            settime();
          }
        })
      } else {
        alert('请输入正确的手机号')
      }
    })
    
    
    $('.inner .last').on('click', function () {
      if ($('#yzm').val().trim() == "") {
        alert('请输入验证码');
        return;
      } else if (code == $('#yzm').val().trim()) {
        $('.mask .inner').css('display', 'none')
        $('.mask .inner1').css('display', 'block')
        
        $.ajax({
          async: true,
          url: "http://crmv2.86sb.com/system-app/addxxx",
          type: "GET",
          dataType: "jsonp",
          jsonp: 'callback',
          jsonpCallback: 'handleResponse',
          data: {
            froms: 1,
            sbname: '新产品',
            uname: '电商管家',
            urlx: 'm.86sb.com/zt/monitoring',
            utel: $('.phoneNum').val()
          },
          success: function (res) {
            // console.log(res);
            if (res == 1) {
              // $('.mask .inner1 .last').click(function () {
              // $('.mask').css('display', 'none')
              // $('.phoneNum').val('')
              // })
            }
          }
        });
      } else if (code == '') {
        alert('请重新获取验证码')
        $('.inner #yzm').val('')
      } else {
        alert('请输入正确的验证码')
      }
    })
    
    
    //点击弹框关闭按钮
    $('.mask .inner .close').click(function () {
      $('.inner .ph').val('')
      $('.inner #yzm').val('')
      clearTimeout(timer)
      $("button.yzm").text("获取验证码");
      countdown = 60;
      code = ''
      $(".yzm").attr("disabled", false);
      $('.mask').css('display', 'none')
      $('.phoneNum').val('')
    })
    
    
    $('.mask .inner1 .close').click(function () {
      $('.inner .ph').val('')
      $('.inner #yzm').val('')
      clearTimeout(timer)
      $("button.yzm").html("获取验证码");
      countdown = 60;
      code = ''
      $(".yzm").attr("disabled", false);
      $('.mask').css('display', 'none')
      $('.mask .inner1').css('display', 'none')
      $('.mask .inner').css('display', 'block')
      $('.phoneNum').val('')
      
    })
    
  }
)




