import pkg from 'package.json' assert { type: 'json' } 
type Pkg = typeof pkg & {
  socialLinks: {
    github: string;
    twitter: string;
    bilibili: string;
  }
}
const _pkg = pkg as Pkg
// 网站常量配置
export const SITE_TITLE = 'Avenue-opposites'
export const SITE_DESCRIPTION = 'Welcome to my website!'
export const GITHUB_URL = _pkg.socialLinks.github
export const TWITTER_URL = _pkg.socialLinks.twitter
export const BILIBILI_URL = _pkg.socialLinks.bilibili
export const DEFAULT_LANGUAGE = 'en'