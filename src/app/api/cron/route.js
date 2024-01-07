import { NextResponse } from "next/server";
import { apiUrl } from "@/config/apiUrl";
import prisma from "@/utils/prisma";
import { M_PLUS_1 } from "next/font/google";

export async function GET(req) {
  let task = null;

    task = await prisma.task.findMany({
      where: {
        //OR: [
          expiryDate: //new Date(),
          {
            // new Date() creates date with current time and day and etc.
            lte: new Date(),
            gte: new Date()
          },
        //   expiryDate: //new Date(),
        //   {
        //     // new Date() creates date with current time and day and etc.
        //     lte: new Date(),
        //     gte: new Date()
        //   },
        // ],
      },
      include: {
          user: {
              select: {
                email: true,
                firstName: true,
                lastName: true,
                username: true,
                //userId: userId,
              },
            },
      },
    });

    //return task;

  if(task) {
    //console.log(task); //exit;
    const finishedTask = [];

    for (const key in task) {
      if (task.hasOwnProperty(key)) {
        //console.log(`${key}: ${task[key]} ${task[key]['name']}`);
        let namaTester = `${task[key]['user']['firstName']} ${task[key]['user']['lastName']}`;
        let itemReminder = task[key]['name'];

        let kiriman = {
          email: task[key]['user']['email'],
          subject: `Pengingat berlaku.id - ${itemReminder}`,
          html: `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"><tbody><tr><td style="padding-right:10px;padding-left:10px" align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="padding-top:20px;padding-bottom:20px;padding-right:0" align="right" valign="middle" class="webview"><a href="#" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:right;text-decoration:underline;padding:0;margin:0" target="_blank" class="text hideOnMobile">Oh wait, there's more! →</a></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px"><tbody><tr><td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td></tr><tr><td style="padding-top:60px;padding-bottom:20px" align="center" valign="middle" class="emailLogo"><a href="#" style="text-decoration:none" target="_blank"><img alt="" border="0" src="https://rifqibucket.s3.ap-southeast-1.amazonaws.com/berlakuid-logo.png" style="width:100%;max-width:150px;height:auto;display:block" width="150"></a></td></tr><tr><td style="padding-bottom:20px" align="center" valign="top" class="imgHero"><a href="#" style="text-decoration:none" target="_blank"><img alt="" border="0" src="https://rifqibucket.s3.ap-southeast-1.amazonaws.com/berlaku-clock-3d.png" style="width:100%;max-width:200px;height:auto;display:block;color:#f9f9f9" width="600"></a></td></tr><tr><td style="padding-bottom:5px;padding-left:20px;padding-right:20px" align="center" valign="top" class="mainTitle"><h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Hi ${namaTester}</h2></td></tr><tr><td style="padding-bottom:30px;padding-left:20px;padding-right:20px" align="center" valign="top" class="subTitle"><h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Kami mengingatkan masa berlaku <b>${itemReminder}</b> yang hampir habis</h4></td></tr><tr><td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style=""><tbody><tr><td style="padding-bottom:20px" align="center" valign="top" class="description"><p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Terima kasih telah menggunakan sistem berlaku.id. Silahkan cek beragam fitur dan keunggulan sistem untuk pengalaman pengguna yang lebih baik.</p></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style=""><tbody><tr><td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="background-color:#00d2f4;padding:12px 35px;border-radius:50px" align="center" class="ctaButton"><a href="https://app.berlaku.id" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Konfirmasi Pengingat</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size:1px;line-height:1px" height="20">&nbsp;</td></tr><tr><td align="center" valign="middle" style="padding-bottom:40px" class="emailRegards"><a href="#" target="_blank" style="text-decoration:none">B Y T E H U B</a></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="space"><tbody><tr><td style="font-size:1px;line-height:1px" height="30">&nbsp;</td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer"><tbody><tr><td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="socialLinks"><a href="#facebook-link" style="display:inline-block" target="_blank" class="facebook"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/facebook.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a><a href="#twitter-link" style="display:inline-block" target="_blank" class="twitter"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/twitter.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a><a href="#pintrest-link" style="display:inline-block" target="_blank" class="pintrest"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/pintrest.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a><a href="#instagram-link" style="display:inline-block" target="_blank" class="instagram"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/instagram.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a><a href="#linkdin-link" style="display:inline-block" target="_blank" class="linkdin"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/linkdin.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a></td></tr><tr><td style="padding:10px 10px 5px" align="center" valign="top" class="brandInfo"><p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">©&nbsp;B Y T E H U B. | Devscale Batch3 | Indonesia.</p></td></tr><tr><td style="padding:0 10px 20px" align="center" valign="top" class="footerLinks"><p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0"><a href="#" style="color:#bbb;text-decoration:underline" target="_blank">View Web Version</a>&nbsp;|&nbsp;<a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Email Preferences</a>&nbsp;|&nbsp;<a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Privacy Policy</a></p></td></tr><tr><td style="padding:0 10px 10px" align="center" valign="top" class="footerEmailInfo"><p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">If you have any questions please contact us<a href="mailto:admin@berlaku.id" style="color:#bbb;text-decoration:underline" target="_blank">admin@berlaku.id.</a><br><a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Unsubscribe</a>from our mailing lists</p></td></tr><tr><td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="appLinks"><a href="#Play-Store-Link" style="display:inline-block" target="_blank" class="play-store"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/app/play-store.png" style="height:auto;margin:5px;width:100%;max-width:120px" width="120"></a><a href="#App-Store-Link" style="display:inline-block" target="_blank" class="app-store"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/app/app-store.png" style="height:auto;margin:5px;width:100%;max-width:120px" width="120"></a></td></tr><tr><td style="font-size:1px;line-height:1px" height="30">&nbsp;</td></tr></tbody></table></td></tr><tr><td style="font-size:1px;line-height:1px" height="30">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>`,
        };
    
        //console.log(kiriman);
        
        try {
          const res = await fetch(`${apiUrl}/mailer`, {
            method  : "POST",
            body    : JSON.stringify(kiriman),
            cache   : 'no-cache'
          });
          const data = await res.json();
          finishedTask.push({ success: true });
          //return NextResponse.json({ message: "Run sending email successfully" });
        } catch (error) {
          console.error(error);
          //finishedTask.push({ success: false });
          //return NextResponse.json({ error: "Error sending email" });
        }
      }
    }

    if(finishedTask.length===task.length){
      return NextResponse.json({ message: "Run sending all email successfully" });
    }
    else{
      return NextResponse.json({ error: "Error sending email(s)" });
    }

    // const kiriman = {
    //   email: "rifqi.izzoboy@gmail.com",
    //   subject: "Email reminder dynamic #1",
    //   html: `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable"><tbody><tr><td style="padding-right:10px;padding-left:10px" align="center" valign="top" id="bodyCell"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td style="padding-top:20px;padding-bottom:20px;padding-right:0" align="right" valign="middle" class="webview"><a href="#" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:right;text-decoration:underline;padding:0;margin:0" target="_blank" class="text hideOnMobile">Oh wait, there's more! →</a></td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px"><tbody><tr><td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td></tr><tr><td style="padding-top:60px;padding-bottom:20px" align="center" valign="middle" class="emailLogo"><a href="#" style="text-decoration:none" target="_blank"><img alt="" border="0" src="https://rifqibucket.s3.ap-southeast-1.amazonaws.com/berlakuid-logo.png" style="width:100%;max-width:150px;height:auto;display:block" width="150"></a></td></tr><tr><td style="padding-bottom:20px" align="center" valign="top" class="imgHero"><a href="#" style="text-decoration:none" target="_blank"><img alt="" border="0" src="https://rifqibucket.s3.ap-southeast-1.amazonaws.com/berlaku-clock-3d.png" style="width:100%;max-width:200px;height:auto;display:block;color:#f9f9f9" width="600"></a></td></tr><tr><td style="padding-bottom:5px;padding-left:20px;padding-right:20px" align="center" valign="top" class="mainTitle"><h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">Halo, ${namaTester}</h2></td></tr><tr><td style="padding-bottom:30px;padding-left:20px;padding-right:20px" align="center" valign="top" class="subTitle"><h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0">Kami mengingatkan masa berlaku <b>${itemReminder}</b> yang hampir habis</h4></td></tr><tr><td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style=""><tbody><tr><td style="padding-bottom:20px" align="center" valign="top" class="description"><p class="text" style="color:#666;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:14px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:22px;text-transform:none;text-align:center;padding:0;margin:0">Thanks for subscribe for the Bytehub berlaku.id. Please click confirm button for subscription to start receiving our emails.</p></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableButton" style=""><tbody><tr><td style="padding-top:20px;padding-bottom:20px" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" align="center"><tbody><tr><td style="background-color:#00d2f4;padding:12px 35px;border-radius:50px" align="center" class="ctaButton"><a href="#" style="color:#fff;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;font-style:normal;letter-spacing:1px;line-height:20px;text-transform:uppercase;text-decoration:none;display:block" target="_blank" class="text">Konfirmasi Pengingat</a></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="font-size:1px;line-height:1px" height="20">&nbsp;</td></tr><tr><td align="center" valign="middle" style="padding-bottom:40px" class="emailRegards"><a href="#" target="_blank" style="text-decoration:none">B Y T E H U B</a></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="space"><tbody><tr><td style="font-size:1px;line-height:1px" height="30">&nbsp;</td></tr></tbody></table></td></tr></tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer"><tbody><tr><td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="socialLinks"><a href="#facebook-link" style="display:inline-block" target="_blank" class="facebook"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/facebook.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a><a href="#twitter-link" style="display:inline-block" target="_blank" class="twitter"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/twitter.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a><a href="#pintrest-link" style="display:inline-block" target="_blank" class="pintrest"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/pintrest.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a><a href="#instagram-link" style="display:inline-block" target="_blank" class="instagram"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/instagram.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a><a href="#linkdin-link" style="display:inline-block" target="_blank" class="linkdin"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/social/light/linkdin.png" style="height:auto;width:100%;max-width:40px;margin-left:2px;margin-right:2px" width="40"></a></td></tr><tr><td style="padding:10px 10px 5px" align="center" valign="top" class="brandInfo"><p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">©&nbsp;Vespro Inc. | 800 Broadway, Suite 1500 | New York, NY 000123, USA.</p></td></tr><tr><td style="padding:0 10px 20px" align="center" valign="top" class="footerLinks"><p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0"><a href="#" style="color:#bbb;text-decoration:underline" target="_blank">View Web Version</a>&nbsp;|&nbsp;<a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Email Preferences</a>&nbsp;|&nbsp;<a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Privacy Policy</a></p></td></tr><tr><td style="padding:0 10px 10px" align="center" valign="top" class="footerEmailInfo"><p class="text" style="color:#bbb;font-family:'Open Sans',Helvetica,Arial,sans-serif;font-size:12px;font-weight:400;font-style:normal;letter-spacing:normal;line-height:20px;text-transform:none;text-align:center;padding:0;margin:0">If you have any quetions please contact us<a href="#" style="color:#bbb;text-decoration:underline" target="_blank">support@mail.com.</a><br><a href="#" style="color:#bbb;text-decoration:underline" target="_blank">Unsubscribe</a>from our mailing lists</p></td></tr><tr><td style="padding-top:10px;padding-bottom:10px;padding-left:10px;padding-right:10px" align="center" valign="top" class="appLinks"><a href="#Play-Store-Link" style="display:inline-block" target="_blank" class="play-store"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/app/play-store.png" style="height:auto;margin:5px;width:100%;max-width:120px" width="120"></a><a href="#App-Store-Link" style="display:inline-block" target="_blank" class="app-store"><img alt="" border="0" src="http://email.aumfusion.com/vespro/img/app/app-store.png" style="height:auto;margin:5px;width:100%;max-width:120px" width="120"></a></td></tr><tr><td style="font-size:1px;line-height:1px" height="30">&nbsp;</td></tr></tbody></table></td></tr><tr><td style="font-size:1px;line-height:1px" height="30">&nbsp;</td></tr></tbody></table></td></tr></tbody></table>`,
    // };

    // //console.log(kiriman);
    
    // try {
    //   const res = await fetch(`${apiUrl}/mailer`, {
    //     method  : "POST",
    //     body    : JSON.stringify(kiriman),
    //     cache   : 'no-cache'
    //   });
    //   const data = await res.json();
    
    //   return NextResponse.json({ message: "Run sending email successfully" });
    // } catch (error) {
    //   console.error(error);
    //   return NextResponse.json({ error: "Error sending email" });
    // }
  }
}
