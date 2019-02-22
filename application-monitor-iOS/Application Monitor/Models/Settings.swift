//
//  Settings.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 2/23/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import UIKit
import os.log

class Settings: NSObject, NSCoding {
    
    // MARK: Properties
    var enableOverallNotifications: Bool
    
    // MARK: Initialization
    init(enableOverallNotifications: Bool) {
        self.enableOverallNotifications = enableOverallNotifications
    }
    
    // MARK: Archiving Paths
    static let DocumentsDirectory = FileManager().urls(for: .documentDirectory, in: .userDomainMask).first!
    static let ArchiveURL = DocumentsDirectory.appendingPathComponent("settings")
    
    // MARK: Types
    struct PropertyKey {
        static let enableOverallUpdates = "enableOverallUpdates"
        static let enableOverallNotifications = "enableOverallNotifications"
    }
    
    // MARK: NSCoding
    func encode(with aCoder: NSCoder) {
        aCoder.encode(enableOverallNotifications, forKey: PropertyKey.enableOverallNotifications)
    }
    
    required convenience init?(coder aDecoder: NSCoder) {
        let enableOverallNotifications = aDecoder.decodeBool(forKey: PropertyKey.enableOverallNotifications)
        
        self.init(enableOverallNotifications: enableOverallNotifications)
    }
}
