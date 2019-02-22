//
//  Copying.swift
//  Application Monitor
//
//  Created by Teresa Bocchini on 8/8/18.
//  Copyright © 2018 Teresa Bocchini. All rights reserved.
//

import Foundation

protocol Copying {
    init(original: Self)
}

extension Copying {
    func copy() -> Self {
        return Self.init(original: self)
    }
}
