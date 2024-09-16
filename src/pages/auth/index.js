import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import WithAuth from '@/components/auth/WithAuth';

import { getFromCookies, getCurrentEnvironment, removeCookie, setInCookies } from '@/utils/storageHelper'
import { getCurrentUser, signUpOnBE } from '@/utils/apiHelper'

export default function index() {
    const router = useRouter();
    const queryParams = router.query;
    async function runEffect() {
        if (!queryParams['proxy_auth_token'] && !getFromCookies(getCurrentEnvironment())) {

            const configuration = {
                referenceId: process.env.NEXT_PUBLIC_NEXT_APP_REFERENCE_ID,
                addInfo: {
                    redirect_path: "/auth"
                },
                success: (data) => {
                    console.log('success response', data)
                },
                failure: (error) => {
                    console.log('failure reason', error)
                }
            }

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.onload = () => {
                const checkInitVerification = setInterval(() => {
                    if (typeof initVerification === 'function') {
                        clearInterval(checkInitVerification)
                        // eslint-disable-next-line no-undef
                        initVerification(configuration)
                    }
                }, 100)
            }
            script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js'

            document.body.appendChild(script)
            redirectToHomePage()
        }
        redirectToHomePage();
    }
    const redirectToHomePage = async () => {
        const token = getFromCookies(getCurrentEnvironment())
        if (token) {
            const userInfo = await getCurrentUser();
            const userData = userInfo?.data[0]
            if (!userData) {
                removeCookie(getCurrentEnvironment())
                localStorage.clear()
                sessionStorage.clear()
            }
            // localStorage.setItem("userid", userData.id);
            localStorage.setItem("userDetail", JSON.stringify({ name: userData.name, email: userData.email, id: userData.id }));
            if (process.env.NEXT_PUBLIC_NEXT_API_ENVIRONMENT === 'local') {
                const response = await signUpOnBE({ ...userData, org_id: parseInt(queryParams['company_ref_id'], 10) })
                // localStorage.setItem('accessToken', response?.data?.data?.token)
                setInCookies(getCurrentEnvironment(), response?.data)
            }
            router.push('/')
        }
    }


    useEffect(() => {
        runEffect();
    }, [queryParams])


    return (
        <WithAuth >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div id={process.env.NEXT_PUBLIC_NEXT_APP_REFERENCE_ID || "870623m1696579096651fbe18d4458"} />
            </div>
        </WithAuth>
    )
}
