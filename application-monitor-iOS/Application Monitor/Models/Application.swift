//
//  Application.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 2/23/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import UIKit
import os.log


class Application: Copying, Comparable {
    static func < (lhs: Application, rhs: Application) -> Bool {
        return lhs.name.lowercased() < rhs.name.lowercased()
    }
    
    static func == (lhs: Application, rhs: Application) -> Bool {
        return lhs.name.lowercased() == rhs.name.lowercased()
    }
    
    // MARK: Properties
    //let id: String
    var name: String
    var photo: UIImage?
    var lastCheck: String
    var platform: Platform
    var lastWindowsVersion: String
    var lastMacVersion: String
    var newWindowsVersion: String
    var newMacVersion: String
    var url: String
    
    // MARK: Initialization
    required init(original: Application) {
        self.name = original.name
        self.photo = original.photo
        self.lastCheck = original.lastCheck
        self.platform = original.platform
        self.lastWindowsVersion = original.lastWindowsVersion
        self.lastMacVersion = original.lastMacVersion
        self.newWindowsVersion = original.newWindowsVersion
        self.newMacVersion = original.newMacVersion
        self.url = original.url
    }
    
    init(name: String, photo: UIImage?, lastCheck: String, platform: Platform, lastWindowsVersion: String, lastMacVersion: String, newWindowsVersion: String, newMacVersion: String, Url: String) {
        // Initialize stored properties
        self.name = name
        self.photo = photo
        self.lastCheck = lastCheck
        self.platform = platform
        self.lastWindowsVersion = lastWindowsVersion
        self.lastMacVersion = lastMacVersion
        self.newWindowsVersion = newWindowsVersion
        self.newMacVersion = newMacVersion
        self.url = Url
    }
}
