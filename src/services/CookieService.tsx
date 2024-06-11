function setCookie(name: string, value: any, days: any) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function incrementPageCounter(page: string) {
    var pageCount = getCookie(page);
    if (!pageCount) {
        setCookie(page, '1', 365);
    } else {
        pageCount = (parseInt(pageCount) + 1).toString();
        setCookie(page, pageCount, 365);
    }
}

function getDashboardPagesFromCookiesWithMostAccessLimit3() {
    var allCookies = document.cookie.split(';');
    var dashboardPages = allCookies.filter((cookie) => cookie.indexOf("/dashboard/view/") === 0);
    var dashboardPagesWithCount = dashboardPages.map((page) => {
        var pageName = page.split('=')[0];
        var pageCount = parseInt(page.split('=')[1]);
        return { page: pageName, count: pageCount };
    });
    dashboardPagesWithCount.sort((a, b) => b.count - a.count);
    return dashboardPagesWithCount.slice(0, 3);
}


export { setCookie, getCookie, incrementPageCounter, getDashboardPagesFromCookiesWithMostAccessLimit3 }