//
//  NetworkInfo.m
//  speakerlight
//
//  Created by Corey Wilson on 7/10/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//
#import "NetworkInfo.h"

#import <ifaddrs.h>
#import <arpa/inet.h>

@import SystemConfiguration.CaptiveNetwork;

@implementation NetworkInfo

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getSSID:(RCTResponseSenderBlock)callback)
{
  NSArray *interfaceNames = CFBridgingRelease(CNCopySupportedInterfaces());
  NSLog(@"%s: Supported interfaces: %@", __func__, interfaceNames);
  
  NSDictionary *SSIDInfo;
  NSString *SSID = @"error";

  for (NSString *interfaceName in interfaceNames) {
    SSIDInfo = CFBridgingRelease(CNCopyCurrentNetworkInfo((__bridge CFStringRef)interfaceName));
    NSLog(@"%s: %@ => %@", __func__, interfaceName, SSIDInfo);
    
    if (SSIDInfo.count > 0) {
      SSID = SSIDInfo[@"SSID"];
      break;
    }
  }
  
  callback(@[SSID]);
}

RCT_EXPORT_METHOD(getIPAddress:(RCTResponseSenderBlock)callback)
{
  NSString *address = @"error";

  struct ifaddrs *interfaces = NULL;
  struct ifaddrs *temp_addr = NULL;
  int success = 0;

  // retrieve the current interfaces - returns 0 on success
  success = getifaddrs(&interfaces);
  
  if (success == 0) {
  
    // Loop through linked list of interfaces
    temp_addr = interfaces;
    while(temp_addr != NULL) {

      if(temp_addr->ifa_addr->sa_family == AF_INET) {

        // Check if interface is en0 which is the wifi connection on the iPhone
        if([[NSString stringWithUTF8String:temp_addr->ifa_name] isEqualToString:@"en0"]) {
          // Get NSString from C String
          address = [NSString stringWithUTF8String:inet_ntoa(((struct sockaddr_in *)temp_addr->ifa_addr)->sin_addr)];
        }
      }
      temp_addr = temp_addr->ifa_next;
    }
  }

  // Free memory
  freeifaddrs(interfaces);
  callback(@[address]);
}

@end
