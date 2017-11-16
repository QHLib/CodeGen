//
//  AppDelegate.m
//  CodeGen
//
//  Created by Tony Tang on 2017/9/12.
//  Copyright © 2017年 TCTONY. All rights reserved.
//

#import "AppDelegate.h"
#import <QHCoreLib/QHCoreLib.h>
#import "QHNetworkSampleApi.h"
#import "QHNetworkSampleGet.h"
#import "QHNetworkSamplePost.h"

@interface AppDelegate ()

@property (nonatomic, strong) QHNetworkSampleApi *api;
@property (nonatomic, strong) QHNetworkSampleGet *getApi;
@property (nonatomic, strong) QHNetworkSamplePost *postApi;

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

    self.api = [QHNetworkSampleApi request];
    [self.api startWithSuccess:^(QHNetworkSampleApi * _Nonnull api, QHNetworkSampleApiResult * _Nonnull result) {
    } fail:^(QHNetworkSampleApi * _Nonnull api, NSError * _Nonnull error) {
    }];

    self.getApi = [QHNetworkSampleGet request_with_query1:@"aaa" query2:@"bbb"];
    [self.getApi startWithSuccess:^(QHNetworkSampleGet * _Nonnull api, QHNetworkSampleGetResult * _Nonnull result) {
    } fail:^(QHNetworkSampleGet * _Nonnull api, NSError * _Nonnull error) {
    }];

    self.postApi = [QHNetworkSamplePost request_with_query1:@"aaa" query2:@"bbb" body1:@"ccc" bdoy2:@"ddd"];
    [self.postApi startWithSuccess:^(QHNetworkSamplePost * _Nonnull api, QHNetworkSamplePostResult * _Nonnull result) {
    } fail:^(QHNetworkSamplePost * _Nonnull api, NSError * _Nonnull error) {
    }];
    
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
