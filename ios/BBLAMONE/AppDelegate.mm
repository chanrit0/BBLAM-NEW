#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"BBLAMONE";
  self.initialProps = @{};
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

#pragma mark - ป้องกันการจับภาพหน้าจอด้วย Blur Effect
- (void)applicationWillResignActive:(UIApplication *)application {
    // เพิ่ม Blur Effect View เพื่อบังหน้าจอ
    UIVisualEffect *blurEffect = [UIBlurEffect effectWithStyle:UIBlurEffectStyleLight];
    UIVisualEffectView *blurEffectView = [[UIVisualEffectView alloc] initWithEffect:blurEffect];
    blurEffectView.frame = self.window.bounds;
    blurEffectView.tag = 999; // ตั้ง tag เพื่อล้าง View ภายหลัง
    [self.window addSubview:blurEffectView];
    [self.window bringSubviewToFront:blurEffectView];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // ลบ Blur Effect View เมื่อแอปกลับมาใช้งาน
    UIView *blurEffectView = [self.window viewWithTag:999];
    [blurEffectView removeFromSuperview];
}

@end